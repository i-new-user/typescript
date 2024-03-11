import { app } from "./app";
import { runDb } from "./db";

const start = async () => {
  try{
    await runDb()
    app.listen(3000, () => {
        console.log(`Example app listening on port ${3000}`)
    })
  } catch(e){
    console.log(`error ${e}`)
  }
}

start()