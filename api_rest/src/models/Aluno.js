import Sequelize, { Model } from 'sequelize';

export default class Aluno extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: { args: [3, 70], msg: 'O nome precisa ter entre 3 e 70 caracteres' },
        },
      },
      sobrenome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: { args: [3, 70], msg: 'O sobrenome precisa ter entre 3 e 70 caracteres' },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: { msg: 'Email já existente' },
        validate: {
          isEmail: { msg: 'O nome precisa ter entre 3 e 70 caracteres' },
        },
      },
      idade: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
          isInt: { msg: 'Idade precisa ser um número inteiro;' },
          len: { args: [0, 110], msg: 'A idade não pode ser menor que zero e maior que 110' },
        },
      },
      altura: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
        validate: {
          isFloat: { msg: 'Peso precisa ser um número inteiro ou de ponto flutuante' },
        },
      },
      peso: {
        type: Sequelize.FLOAT,
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
}
