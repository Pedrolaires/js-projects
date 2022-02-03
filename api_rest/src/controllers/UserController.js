import User from '../models/User';

class UserController {
  async create(req, res) {
    try {
      const user = await User.create(req.body);
      return res.json(user);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (e) {
      return res.status(400).json(null);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      return res.json(user);
    } catch (e) {
      return res.status(400).json(null);
    }
  }

  async update(req, res) {
    try {
      if (!req.params.id) return res.status(400).json({ errors: ['Id não enviado!'] });

      const user = await User.findByPk(req.params.id);

      if (!user) return res.status(400).json({ errors: ['Usuário não existente!'] });

      const novosDados = await user.update(req.body);
      return res.status(200).json(novosDados);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id) return res.status(400).json({ errors: ['Id não enviado!'] });

      const user = await User.findByPk(req.params.id);

      if (!user) return res.status(400).json({ errors: ['Usuário não existente!'] });

      await user.destroy();
      return res.status(200).json(null);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();
