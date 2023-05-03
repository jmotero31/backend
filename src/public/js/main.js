//console.log("Probando que el Js funcione, despues vemos como desarrollarlo con los eventos")
const socket = io()  // se puede escuchar la conexion con el servidor

const formProduct = document.getElementById("formProducto")
const productoshtml = document.getElementById('productoshtml')



//document.getElementById("eliminar").onclick = ()=>{console.log("Aprete")}


socket.on('ping', ()=>{
  console.log("escuchado")
  //socket.emit('pong')
})



socket.on('server:lista', pro =>{  
  productoshtml.innerHTML = "" 
  pro.forEach(mensaje => {
    productoshtml.innerHTML += 
        `<il class='ItemListcontainer'> 
        <div class='estilo'> 
        <div >
        <div class='contenedorIm'>
        <img src="" style= "width: '220px', height: '220px'" alt="">Imagen</img>
        </div>
        <br></br>
        <div class='contenedorcont'>
        <h4 class='categoria'> ${mensaje.category}</h4>
                    <h2> ${ mensaje.title }</h2>
                    <text> ${ mensaje.description }</text>
                    <br></br>
                    <div class="marcar">
                    <p><span class='resaltar'>Precio: </span>$ ${ mensaje.price }</p>
                    <p><span class='resaltar'>Stock disponible: </span> ${ mensaje.stock }</p>
                    </div>
                    
                    <button type="button" class="btn btn-danger" onclick="borrar(${mensaje.id})">Eliminar</button>
                  </div>
                  </div>
                  </div>
                  </il>`
                })

            })
            
            
            
            
formProduct.addEventListener('submit', (e)=>{
  e.preventDefault()
  // e.target es el formulario de mi app
  const prodIterado = new FormData(e.target) // transforma un ojeto html a un objeto iterado
    const pro = Object.fromEntries(prodIterado)  // lo paso a un objeto simple
    //console.log(pro)
    socket.emit('cliente:nuevoproducto', pro)
    
    socket.on('server:agrego', pro=>{
      productoshtml.innerHTML = "" 
      pro.forEach(mensaje => {
            productoshtml.innerHTML += 
            `<il class='ItemListcontainer'> 
            <div class='estilo'> 
            <div >
            <div class='contenedorIm'>
            <img src="" style= "width: '220px', height: '220px'" alt="">Imagen</img>
                  </div>
                  <br></br>
                  <div class='contenedorcont'>
                  <h4 class='categoria'> ${mensaje.category}</h4>
                  <h2> ${ mensaje.title }</h2>
                  <text> ${ mensaje.description }</text>
                    <br></br>
                    <div class="marcar">
                    <p><span class='resaltar'>Precio: </span>$ ${ mensaje.price }</p>
                    <p><span class='resaltar'>Stock disponible: </span> ${ mensaje.stock }</p>
                    </div>
                  
                  <button type="button" id="eliminar" data-id="${mensaje.id}" class="btn btn-danger" onclick="borrar(${mensaje.id})")'>Eliminar</button>
                  </div>
                  </div>
                  </div>
                  </il>`   
        })
      })  
})
    
const borrar = (id) =>{
  socket.emit('cliente:borrar', id)
}    
const modificar = (id) =>{
  socket.emit('cliente:modificar', id)
}           
  
            
            