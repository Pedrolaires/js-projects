import Sequelize from 'sequelize';
import databaConfig from '../config/database';
import Aluno from '../models/Aluno';
import User from '../models/User';

const models = [Aluno, User];

const connection = new Sequelize(databaConfig);

models.forEach((model) => model.init(connection));
