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
    try {
      const team = await Team.findByPk(req.params.teamId);
      if (!team) throw { message: 'Team not found' };
      res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ControllerTeam;
