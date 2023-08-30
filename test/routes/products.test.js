import { expect } from "chai";
import supertest from 'supertest'
import {deleteProduct} from '../setup.test.js'
import config from '../../src/config/config.js'




const requester = supertest(`http://localhost:${config.port}`)

describe('Test routes Products',()=>{

    before (async ()=>{
        //await deleteProduct() 
    })

    it('[POST] /session/login',async()=>{
        const login={
            email: 'hello@live.com.ar', 
            password: 'Coder2023'
        }         
        const response = await requester
        .post('/session/login')
        .send(login)
        console.log(response)
        expect(response.statusCode).to.be.eql(500)
    })

    it('[POST] /product',async()=>{
        const producto={
            title: 'Prueba', 
            description: 'Prueba', 
            price: 2, 
            status: true, 
            stock: 20, 
            category: 'Prueba', 
            thumbnail: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJOuVNDLModL1n3OGrKz2AiQD6YyXhidj6oA&usqp=CAU'], 
            code: 'code1234',
            owner: '4521'
        }  
        
        const response = await requester
        .post('/product')
        .send(producto)
        
        //console.log(response)
        console.log(response.body)
        expect(response)
        expect(response.statusCode).to.be.eql(200)
        expect(response.body.payload)

        //await deleteProduct()
    })
})