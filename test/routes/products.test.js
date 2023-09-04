import { expect } from "chai";
import supertest from 'supertest'
import {deleteProduct} from '../setup.test.js'
import config from '../../src/config/config.js'
import {generateToken} from '../../src/utils/jsontoken.js'

const requester = supertest(`http://localhost:${config.port}`)

describe('Test routes Products',()=>{

    before (async ()=>{
        await deleteProduct() 
    })

    it('[POST] /session/login REDIRECCION',async()=>{
        const login = {
            email: 'hello@live.com.ar', 
            password: 'Coder2023'
        }      
     
        const response = await requester
        .post('/session/login')
        .send(login)
 
        expect(response.redirect).to.be.true
        //expect(response.statusCode).to.be.eql(302)
    })

    it('[POST] /product',async()=>{
        const producto={
            title: 'test', 
            description: 'test', 
            price: 2, 
            status: true, 
            stock: 20, 
            category: 'Prueba', 
            //thumbnail: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJOuVNDLModL1n3OGrKz2AiQD6YyXhidj6oA&usqp=CAU'], 
            code: 'code1234',
            //owner: '4521'
        }  
    
        const login = {
            email: 'hello@live.com.ar', 
            password: 'Coder2023',
            rol: 'administrador'
        }      
        const testToken = generateToken(login, '5h')
        const response = await requester

        .post('/product')
        .set('Authorization', `${testToken}`)
        .send(producto)

        expect(response.statusCode).to.be.eql(200)
        //expect(response.request._data)
        //await deleteProduct()
    })

    it('[POST] /cart/:cid/product/:pid',async()=>{
        const cart={
            cid: '64ad1ec60bae19e22135e726', 
            pid: '646958b917e5b482f5f4455d'
        }  
        const login = {
            email: 'hello@live.com.ar', 
            password: 'Coder2023',
            rol: 'usuario'
        }      
        const testToken = generateToken(login, '5h')
        const response = await requester

        .post(`/cart/${cart.cid}/product/${cart.pid}`)
        .set('Authorization', `${testToken}`)
        .send({quantity: 2})

        expect(response.statusCode).to.be.eql(200)
        //expect(response.request._data)
        //await deleteProduct()
    })
})