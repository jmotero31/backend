export const getRaiz =  async (req, res)=>{
    try {
        res.render('home', {
            titulo: "Curso de Banckend",
            cuerpo: 'Estamos en la Raiz de la APP',
            valorNav: req.session.login,
            name: req.session.login? req.session.user.nombre : "Logueate",
            rol: req.session.user.rol
        })
    } catch (error) {
        res.send(error)
    }
}