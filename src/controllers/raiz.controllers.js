export const getRaiz =  async (req, res)=>{
    try {
        res.render('home', {
            titulo: "Curso de Banckend",
            cuerpo: 'Estamos en la Raiz de la APP',
            valorNav: req.cookies['access_token']? true : false,
            name: req.cookies['access_token']? `Hola, ${req.user.first_name}` : "Logueate"
        })
    } catch (error) {
        res.send(error)
    }
}