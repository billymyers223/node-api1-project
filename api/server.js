// BUILD YOUR SERVER HERE
const express = require('express')
const server = express()

server.use(express.json())

server.get('/', (req, res) =>{
    res.json({message:'hello world'})
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
