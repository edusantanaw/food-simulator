const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes/routes')
const createAdmin = require('./admin/createAdmin')
app.use(cors({credentials: true, origin: 'http://127.0.0.1:5173'}))

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))

// if dont have any user, create a new admin
createAdmin()
app.use('/', routes)

const Port  = process.env.PORT || 4000
app.listen(Port, ()=> {
    console.log(`Servidor rodando na porta ${Port}`)
})