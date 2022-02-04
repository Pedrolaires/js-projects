"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Foto = require('../models/Foto'); var _Foto2 = _interopRequireDefault(_Foto);

class AlunoController {
  async index(req, res) {
    const alunos = await _Aluno2.default.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC'], [_Foto2.default, 'id', 'DESC']],
      include: {
        model: _Foto2.default,
        attributes: ['filename', 'originalname', 'url'],
      },
    });
    return res.json(alunos);
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ errors: ['Faltando ID'] });

      const aluno = await _Aluno2.default.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [_Foto2.default, 'id', 'DESC']],
        include: {
          model: _Foto2.default,
          attributes: ['filename', 'originalname', 'url'],
        },
      });

      if (!aluno) return res.status(400).json({ errors: ['O Aluno não existe'] });

      return res.json(aluno);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async create(req, res) {
    try {
      const aluno = await _Aluno2.default.create(req.body);
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

      const aluno = await _Aluno2.default.findByPk(id);

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

      const aluno = await _Aluno2.default.findByPk(id);

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

exports. default = new AlunoController();
