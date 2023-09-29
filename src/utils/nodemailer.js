import nodemailer from 'nodemailer'
import config from '../config/config.js'
import { readFile } from 'fs/promises'
import { __dirname } from '../path.js'
import { join } from 'path'
import Handlebars from 'handlebars'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.nodemailer_gmail_user,
        pass: config.nodemailer_gmail_password
    }
})
export const mailTicket = async(email, date, first_name, products, total, order) => {
    try {
        const template = join(__dirname, '/views/template/ticketNew.handlebars')
        const data = await readFile(template, 'utf8')
        const compiledTemplate = Handlebars.compile(data)
        const html = compiledTemplate({
            fechaCompra: date,
            nombreCliente: first_name,
            productos: products,
            total: total,
            numeroOrden: order,
        })
        await transporter.sendMail({
            to: email,
            subject: `${first_name} Este es tu Ticket de Compra`,
            //text: 'Prueba del primer correo desde el backend',
            html: html
        })        
    } catch (error) {
        return error
    }
}
export const mailUser = async(email, last_name, first_name) => {
    try {
        const template = join(__dirname, '/views/template/userNew.handlebars')
        const data = await readFile(template, 'utf8')
        const compiledTemplate = Handlebars.compile(data)
        const html = compiledTemplate({
            nombre: first_name,
            apellido: last_name,
            usuario: email
        })
        await transporter.sendMail({
            to: email,
            subject: `Bienvenido ${first_name} a Nuevos Aires`,
            //text: 'Prueba del primer correo desde el backend',
            html: html
        })        
    } catch (error) {
        return error
    }
}
export const verifypassword = async(email, last_name, first_name, link) => {
    try {
        const template = join(__dirname, '/views/template/verifyPass.handlebars')
        const data = await readFile(template, 'utf8')
        const compiledTemplate = Handlebars.compile(data)
        const html = compiledTemplate({
            nombre: first_name,
            apellido: last_name,
            usuario: email,
            link: link
        })
        await transporter.sendMail({
            to: email,
            subject: `Restablece la contrasena  ${first_name}`,
            //text: 'Prueba del primer correo desde el backend',
            html: html
        })        
    } catch (error) {
        return error
    }
}
export const mailDeleteUser = async(email, last_name, first_name)=>{
    try {
        const template = join(__dirname, '/views/template/userDelete.handlebars')
        const data = await readFile(template, 'utf8')
        const compiledTemplate = Handlebars.compile(data)
        const html = compiledTemplate({
            nombre: first_name,
            apellido: last_name
        })
        await transporter.sendMail({
            to: email,
            subject: `Te esperamos pronto ${first_name} a Nuevos Aires`,
            //text: 'Prueba del primer correo desde el backend',
            html: html
        })        
    } catch (error) {
        return error
    }
}
export const mailDeleteProductPremium = async(email, last_name, first_name, product)=>{
    try {
        const template = join(__dirname, '/views/template/productDelete.handlebars')
        const data = await readFile(template, 'utf8')
        const compiledTemplate = Handlebars.compile(data)
        const html = compiledTemplate({
            nombre: first_name,
            apellido: last_name,
            producto: product
        })
        await transporter.sendMail({
            to: email,
            subject: `Notificaciones ${first_name} sobre tu producto`,
            html: html
        })        
    } catch (error) {
        return error
    }
}