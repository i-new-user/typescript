import { app } from "./app";
import { runDb } from "./db";

import dotenv from 'dotenv'
dotenv.config()


const start = async () => {
  try{
    await runDb()
    app.listen(process.env.PORT || 3001, () => {
        console.log(`Example app listening on port ${process.env.PORT}`)
    })
  } catch(e){
    console.log(`error ${e}`)
  } 
}

start()
