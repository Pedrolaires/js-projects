import validator from 'validator';

export default class Login{
    constructor(formClass){
        this.form = document.querySelector(formClass);
    };

    init(){
        this.events();
    };

    events(){
        if(!this.form) return;
        this.form.addEventListener('submit', e =>{
            e.preventDefault();
            this.validate(e);
        });
    };

    validate(e){    
        const el = e.target;
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        let error = false;
        
        if(!validator.isEmail(emailInput.value)){
            this.errorHandler('Email inválido', emailInput);
            error = true;
        }
        if(passwordInput.value.length < 6){
            this.errorHandler('Dados inválidos', passwordInput);
            error = true;
        };
        if(!error) el.submit();
        
        
    }
    
    clearError(){
        const errorDiv = document.querySelector('.invalid-feedback');
        if(!errorDiv) return;
        errorDiv.parentNode.removeChild(errorDiv);
    }

    errorHandler(msg, input){
        this.clearError();
        const div = document.createElement('div');
        div.classList.add('invalid-feedback');
        div.innerHTML = msg;
        const parent = input.parentNode;
        input.classList.add('is-invalid');
        parent.appendChild(div);
    };
}