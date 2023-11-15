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
      console.log('TES');
      const team = await Team.findByPk(req.params.teamId);
      console.log(team);
      if (!team) throw { name: 'not found', message: 'Team not found' };
      res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  }

  static async addTeam(req, res, next) {
    const { name, nickname, city, logo } = req.body;
    try {
      const newTeam = await Team.create({ name, nickname, city, logo, UserId: req.user.id });
      res.status(201).json(newTeam);
    } catch (error) {
      next(error);
    }
  }

  static async updateTeam(req, res, next) {
    const { name, nickname, city, logo } = req.body;
    try {
      const updateTeam = await Team.findByPk(req.params.teamId);
      if (!updateTeam) throw { name: 'not found', message: 'Team Not Found' };

      await updateTeam.update({ name, nickname, city, logo });
      res.status(200).json(updateTeam);
    } catch (error) {
      next(error);
    }
  }

  static async deleteTeam(req, res, next) {
    try {
      const team = await Team.findByPk(req.params.teamId);
      if (!team) throw { name: 'not found', message: 'Team Not Found' };
      res.status(200).json({ message: `Team with nickname ${team.nickname} success to delete` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ControllerTeam;
