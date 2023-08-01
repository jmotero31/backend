export default class CustomError {
    static createCustomError({ name='Error', message, cause, code }) {  
      const error = new Error(message, { cause })
      error.name = name,
      error.code= code 
      console.log(cause)
      throw error
    }
  }