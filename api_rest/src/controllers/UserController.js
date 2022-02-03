import User from '../models/User';

class UserController {
  async create(req, res) {
    try {
      const user = await User.create(req.body);
      const { id, nome, email } = user;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  /* async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'nome', 'email'] });
      return res.json(users);
    } catch (e) {
      return res.status(400).json(null);
    }
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      const { id, nome, email } = user;

      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json(null);
    }
  } */

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) return res.status(400).json({ errors: ['Usuário não existente!'] });

      const novosDados = await user.update(req.body);
      const { id, nome, email } = novosDados;
      return res.status(200).json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) return res.status(400).json({ errors: ['Usuário não existente!'] });

      await user.destroy();
      return res.status(200).json({ sucess: ['Usuário apagado'] });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();
