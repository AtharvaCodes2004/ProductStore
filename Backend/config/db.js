import pg from "pg"
import dotenv from "dotenv"

dotenv.config()

const {PGUSER, PGPASSWORD, PGDATABASE, PGHOST, PGPORT} = process.env
const db = new pg.Client({
    user: PGUSER,
    password: PGPASSWORD,
    database: PGDATABASE,
    host: PGHOST,
    port: PGPORT
})

db.connect()
    .then(()=>{
        console.log("Database connected")
    })
    .catch(()=>{
        console.log("Error connecting database")
    })

export default db