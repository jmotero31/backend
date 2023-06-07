import { Router } from "express";
import { getUserAll } from "../controllers/user.controllers.js";

const userRoute = Router()

userRoute.get('/', getUserAll)

export default userRoute

/*
await userModel.create([
    {
      first_name: 'Emili',
      last_name: 'Erli',
      email: 'emili@erli.com',
      gender: 'F'
    },
    {
      first_name: 'Hector',
      last_name: 'Her',
      email: 'Hector@Her.com',
      gender: 'M'
    },
    {
      first_name: 'Leonardo',
      last_name: 'Ler',
      email: 'Leonardo@Ler.com',
      gender: 'M'
    },
    {
      first_name: 'Lucia',
      last_name: 'Lu',
      email: 'Lucia@Lu.com',
      gender: 'F'
    },
    {
      first_name: 'Martin',
      last_name: 'Mart',
      email: 'Martin@Mart.com',
      gender: 'M'
    }
  ])
  */