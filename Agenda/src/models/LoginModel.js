const mongoose = require('mongoose');
const validator = require('validator');

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

    async register(){
        this.validates();
        if(this.errors.length > 0) return;
        try{
            this.user = await loginModel.create(this.body);
        }catch(e){
            console.log(e);
        }
    }

}

module.exports = Login;