const { Team } = require('../models');

class ControllerTeam {
  static async getTeam(req, res, next) {
    const { sort, page } = req.query;
    let paramQuerySQL = {
      order: [['id', 'ASC']],
      limit: 10,
      offset: 0,
    };
    let limit = 10;
    let offset;
    if (page) {
      if (page.size) {
        limit = page.size;
        paramQuerySQL.limit = limit;
      }

      if (page.number) {
        offset = page.number * limit - limit;
        paramQuerySQL.offset = offset;
      }
    }

    if (sort) {
      let query;
      query = [['name', sort]];
      paramQuerySQL.order = query;
    }
    try {
      const teams = await Team.findAndCountAll(paramQuerySQL);
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
