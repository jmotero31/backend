export const getRaiz =  async (req, res)=>{
    try {
        res.render('home', {
            titulo: "Curso de Banckend",
            cuerpo: 'Estamos en la Raiz de la APP',
            valorNav: req.cookies['access_token']? true : false,
            //name: req.user.first_name? `Hola, ${req.user.first_name}` : "Logueate"
        })       
    } catch (error) {
        res.status(500).json({message: 'error', error})
    }
}