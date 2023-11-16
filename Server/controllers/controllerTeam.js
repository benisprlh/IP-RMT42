const { Team } = require('../models');

class ControllerTeam {
  static async getTeam(req, res, next) {
    try {
      const teams = await Team.findAll();
      res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }

  static async getTeamById(req, res, next) {
    console.log(req.params);
    try {
      const team = await Team.findByPk(req.params.teamId, {
        include: {
          association: 'Statistic',
          attributes: ['games', 'fastBreakPoints', 'pointsInPaint', 'pointsOffTurnovers', 'points', 'offReb', 'defReb', 'steals'],
        },
      });
      if (!team) throw { name: 'not found', message: 'Team not found' };
      res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  }

  static async deleteTeam(req, res, next) {
    try {
      const team = await Team.findByPk(req.params.teamId);
      if (!team) throw { name: 'not found', message: 'Team Not Found' };
      await team.destroy();
      res.status(200).json({ message: `Team with nickname ${team.nickname} success to delete` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ControllerTeam;
