import { fakerEs } from '@faker-js/faker'

export const generateUser = () =>{
    return{
        first_name: fakerEs.person.lastName(),
        last_name: fakerEs.person.middleName(),
        email: fakerEs.internet.email(),
        gender: fakerEs.person.gender().charAt(0),
        psssword: fakerEs.internet.password({ length: 8 }),
        cart: fakerEs.database.mongodbObjectId()
    }
}
export const generateProduct = ()=>{
    return{
        title: fakerEs.commerce.product(),
        description: fakerEs.commerce.productDescription(),
        price: fakerEs.commerce.price({ min: 1000, max: 200000 }),
        status: true,
        stock: fakerEs.number.int({ min: 10, max: 100 }),
        category: fakerEs.commerce.department(),
        thumbmail: fakerEs.image.abstract(640, 480),
        code: fakerEs.random.alphaNumeric(5)
    }
}