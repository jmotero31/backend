//console.log("Probando que el Js funcione, despues vemos como desarrollarlo con los eventos")
/*
const socket = io()  // se puede escuchar la conexion con el servidor

const formProduct = document.getElementById("formProducto")
const productoshtml = document.getElementById('productoshtml')


socket.on('ping', ()=>{
  console.log("escuchado")
  //socket.emit('pong')
})

socket.on('server:lista', pro =>{  
  productoshtml.innerHTML = "" 
  pro.forEach(mensaje => {
    productoshtml.innerHTML += 
    `<div class="card" style="width: 300px; margin: 10px; padding: 20px; background-color: #fff; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); border-radius: 5px;">
      <img src="..." class="card-img-top" alt="..."></img>
      <div class="card-body">
        <p class="list-group-item" style="background-color: rgba(73, 177, 177, 0.665); color: azure; font-family: 'Times New Roman', Times, serif; font-weight: 900; font-size: x-large; border-radius: 0.5rem">${mensaje.category}</p>
        <h5 class="card-title" style="overflow: hidden">${ mensaje.title }</h5>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">  ${ mensaje.description }</li>
        <li class="list-group-item">${ mensaje.stock }</li>
        <li class="list-group-item">$ ${ mensaje.price }</li>
      </ul>
      <div class="card-body">
        <button type="button" id="eliminar" data-id="${mensaje.id}" class="btn btn-danger" onclick="borrar(${mensaje.id})">Eliminar</button>
      </div>
    </div>` 
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
      `<div class="card" style="width: 300px; margin: 10px; padding: 20px; background-color: #fff; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); border-radius: 5px;">
      <img src="..." class="card-img-top" alt="..."></img>
      <div class="card-body">
        <p class="list-group-item" style="background-color: rgba(73, 177, 177, 0.665); color: azure; font-family: 'Times New Roman', Times, serif; font-weight: 900; font-size: x-large; border-radius: 0.5rem">${mensaje.category}</p>
        <h5 class="card-title" style="overflow: hidden">${ mensaje.title }</h5>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">${ mensaje.description }</li>
        <li class="list-group-item">${ mensaje.stock }</li>
        <li class="list-group-item">$ ${ mensaje.price }</li>
      </ul>
      <div class="card-body">
        <button type="button" id="eliminar" data-id="${mensaje.id}" class="btn btn-danger" onclick="borrar(${mensaje.id})">Eliminar</button>
      </div>
    </div>`
    })
  })  
})
     
const borrar = (id) =>{
  socket.emit('cliente:borrar', id)
}    
const modificar = (id) =>{
  socket.emit('cliente:modificar', id)
}           
  

*/
            
