import Aluno from '../models/Aluno';

class HomeController {
  async index(req, res) {
    const aluno = await Aluno.create({
      nome: 'Pedro',
      sobrenome: 'Aires',
      email: 'pedrolucas@gmail.com',
      idade: '21',
      altura: '2.5',
      peso: '70',
    });
    res.json(aluno);
  }
}

export default new HomeController();
