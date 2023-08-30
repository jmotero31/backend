import Assert from 'assert'

const assert = Assert.strict

describe("Titulo de las pruebas", ()=>{
    before(()=>{
        console.log("Se ejecuta una vez antes de cada prueba")
    }) 
    beforeEach(()=>{
        console.log('Se ejecuta antes de cada prueba')
    })
    after(()=>{
        console.log('Se ejecuta una vez despues de cada prueba')
    })
    afterEach(()=>{
        console.log('Se ejecuta despues de cada prueba')
    })
    it('Prueba esccenario 1', ()=>{
        assert.strictEqual(true, true)
    })
    it('Prueba esccenario 2', ()=>{
        assert.strictEqual(true, false)
    })    
})