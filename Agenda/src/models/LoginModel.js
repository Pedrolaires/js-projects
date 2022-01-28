const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs')

const { SourceMapDevToolPlugin } = require('webpack');

const loginSchema = new mongoose.Schema({
    email:{ type: String, required: true},
    password:{type: String, required: true}
});

const loginModel = mongoose.model('login', loginSchema);

class Login{
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    }
    async login(){
        this.validates();

        if(this.errors.length > 0) return;

        this.user = await loginModel.findOne({email: this.body.email});

        if(!this.user){
            this.errors.push('O usuário não existe!');
            return;
        } 

        if(!bcryptjs.compareSync(this.body.password,this.user.password)){
            this.errors.push('Senha iválida!');
            this.user = null;
            return;
        }
    }

    cleanUp(){
        for (const key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = '';
            }
        }
        this.body = {
            email: this.body.email,
            password: this.body.password
        }

    }

    validates(){
        this.cleanUp();

        if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
        if(this.body.password.length < 6) this.errors.push('A senha precisa ter mais de 6 caracteres.');
    }

    async userExists(){
        this.user = await loginModel.findOne({email: this.body.email});
        if(this.user) this.errors.push('Este usuário já existe! Tente fazer o login');
    }

    async register(){
        this.validates();
        if(this.errors.length > 0) return;

        await this.userExists();
        if(this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);
        
        this.user = await loginModel.create(this.body);

    }
}

module.exports = Login;