const Contato = require('../models/ContatoModel');

exports.index = (req,res)=>{
    res.render('contato',{contato:{}});
}

exports.register = async (req,res)=>{
    try { 
        const contato = new Contato(req.body);
        await contato.register();

        if(contato.errors.length > 0){
            req.flash('errors', contato.errors);
            req.session.save(()=> res.redirect('/contato'));
            return;
        }
        req.flash('success', 'Contato criado com êxito!)');
        req.session.save(() => res.redirect(`/contato/${contato.contato._id}`));
        return;
    } catch (error) {
        console.log(error);
        return res.render('404');
    }
};

exports.editIndex = async (req, res)=>{
    if(!req.params.id) return res.render('404');
    const contato = await Contato.findById(req.params.id);
    if(!contato) return res.render('404');

    res.render('contato', {contato});
};

exports.edit = async(req, res)=>{
    try {
        if(!req.params.id) return res.render('404');
        const contato = new Contato(req.body);
        await contato.edit(req.params.id);
        
        if(contato.errors.length > 0){
            req.flash('errors', contato.errors);
            req.session.save(()=> res.redirect(`/`));
            return;
        }
        req.flash('success', 'Contato editado com êxito!)');
        req.session.save(() => res.redirect(`/contato/${contato.contato._id}`));
        return;
        
    } catch (error) {
        console.log(error);
        res.render('404')
    }
};

exports.delete = async (req,res)=>{
    if(!req.params.id) return res.render('404');

    const contato = await Contato.deleteContacts(req.params.id);

    if(!contato) return res.render('404');

    req.flash('success', 'Contato apagado com êxito!');
    req.session.save(() => res.redirect(`/`));
};