export const getRaiz =  async (req, res)=>{
    try {
        if(!req.cookies['access_token']){
            delete req.user
            console.log('que paso', req.user)
        }
        res.render('home', {
            titulo: "Curso de Banckend",
            cuerpo: 'Estamos en la Raiz de la APP',
            valorNav: req.user? true : false,
            name: req.user? `Hola, ${req.user.first_name}` : "Logueate"
        })
    } catch (error) {
        res.send(error)
    }
}