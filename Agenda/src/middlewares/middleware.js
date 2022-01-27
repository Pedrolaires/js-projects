exports.middlewareGlobal = (req,res, next)=>{
    res.locals.errors = req.flash('errors');
    next();
};
exports.checkCsrfError = (err, req, res, next) => {
    if(err) {
        console.log(err)
      return res.render('404');
    };
};
exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};