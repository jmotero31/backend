export default class CustomError {
    static createCustomError({ name='Error', message, cause, code=1 }) {
      const error = new Error(message, { cause })
      error.name = name,
      error.code= code
      throw error
    }
  }