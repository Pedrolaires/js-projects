const mongoose = require('mongoose');
const validator = require('validator');

const { SourceMapDevToolPlugin } = require('webpack');

const ContatoSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    sobrenome: {type: String, required: false, default: ''},
    email: {type: String, required: false, default: ''},
    telefone: {type: String, required: false, default: ''},
    criadoEm: {type: Date, default: Date.now}
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);


class Contato{
    constructor(body){
        this.errors = [];
        this.body = body;
        this.contato = null;
    }

    async register(){
        this.validates();
        if(this.errors.length > 0) return;
        this.contato = await ContatoModel.create(this.body);
    }

    cleanUp(){
        for (const key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = '';
            }
        }
        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            telefone: this.body.telefone
        }

    }

    validates(){
        this.cleanUp();

        if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
        if(!this.body.nome) this.errors.push('\'Nome\' é um campo obrigatório!');
        if(!this.body.telefone && !this.body.email) this.errors.push('É necessario enviar ao menos um meio de contato! Email e/ou Telefone');
    }

   /*  async contactExists(){
        this.user = await loginModel.findOne({email: this.body.email})
        if (user) this.errors.push('Este usuário já existe! Tente fazer o login ou \'Esqueci a senha\'.');
    } */

}

module.exports = Contato;