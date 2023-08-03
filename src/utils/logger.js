import winston from 'winston'
import config from '../config/config.js'

const levelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'cyan',
        warning: 'yellow',
        info: 'blue',
        http: 'green',
        debug: 'white'
    }
}
const createLogger = env => {
    if (env === 'development') {
        return winston.createLogger({
            levels: levelOptions.levels,
            transports: [
                new winston.transports.Console({
                    level: 'debug',
                    format: winston.format.combine(
                        winston.format.colorize({ colors: levelOptions.colors }),
                        winston.format.simple()
                    )
                })
            ]
        })
    } else {       
        return winston.createLogger({
            levels: levelOptions.levels,
            transports: [
                new winston.transports.File({
                    filename: '../log/errors.log',
                    level: 'info',
                    format: winston.format.simple()
                })
            ]
        })
    }
}
export default createLogger(config.around)