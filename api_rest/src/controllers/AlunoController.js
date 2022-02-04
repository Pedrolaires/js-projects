import Aluno from '../models/Aluno';

class AlunoController {
  async index(req, res) {
    const alunos = await Aluno.findAll();
    return res.json(alunos);
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ errors: ['Faltando ID'] });

      const aluno = await Aluno.findByPk(id);

      if (!aluno) return res.status(400).json({ errors: ['O Aluno não existe'] });

      const { nome, sobrenome, email } = aluno;
      return res.json({ nome, sobrenome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async create(req, res) {
    try {
      const aluno = await Aluno.create(req.body);
      const { nome, sobrenome, email } = aluno;
      return res.json({ nome, sobrenome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ errors: ['Faltando ID'] });

      const aluno = await Aluno.findByPk(id);

      if (!aluno) return res.status(400).json({ errors: ['O Aluno não existe'] });

      await aluno.destroy();
      return res.json({ status: 'sucesso' });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ errors: ['Faltando ID'] });

      const aluno = await Aluno.findByPk(id);

      if (!aluno) return res.status(400).json({ errors: ['O Aluno não existe'] });

      const novosDados = await aluno.update(req.body);
      const { nome, sobrenome, email } = novosDados;
      return res.json({ nome, sobrenome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new AlunoController();
