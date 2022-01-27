const Contato = require('../models/ContatoModel');

exports.index = (req,res)=>{
    res.render('contato');
}

exports.register = async (req,res)=>{

    try {
        
        const contato = new Contato(req.body);
        await contato.register();
    
        if(contato.errors.length > 0){
            req.flash('errors', contato.errors);
            req.session.save(()=> res.redirect('/contatos/'));
            return;
        }
    
        req.flash('success', 'Contato criado com êxito!\n;)');
        req.session.save(()=> res.redirect('/contatos/'));
        return;
    } catch (error) {
        console.log(error);
        res.render('404');
    }
}