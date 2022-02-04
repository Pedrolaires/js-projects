"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Aluno extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: { args: [3, 70], msg: 'O nome precisa ter entre 3 e 70 caracteres' },
        },
      },
      sobrenome: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: { args: [3, 70], msg: 'O sobrenome precisa ter entre 3 e 70 caracteres' },
        },
      },
      email: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        unique: { msg: 'Email já existente' },
        validate: {
          isEmail: { msg: 'O nome precisa ter entre 3 e 70 caracteres' },
        },
      },
      idade: {
        type: _sequelize2.default.INTEGER,
        defaultValue: 0,
        validate: {
          isInt: { msg: 'Idade precisa ser um número inteiro;' },
          len: { args: [0, 110], msg: 'A idade não pode ser menor que zero e maior que 110' },
        },
      },
      altura: {
        type: _sequelize2.default.FLOAT,
        defaultValue: 0,
        validate: {
          isFloat: { msg: 'Peso precisa ser um número inteiro ou de ponto flutuante' },
        },
      },
      peso: {
        type: _sequelize2.default.FLOAT,
        defaultValue: 0,
        validate: {
          isFloat: { msg: 'Peso precisa ser um número inteiro ou de ponto flutuante' },
        },
      },
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.hasMany(models.Foto, { foreignKey: 'aluno_id' });
  }
} exports.default = Aluno;
