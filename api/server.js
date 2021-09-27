// BUILD YOUR SERVER HERE
const express = require('express')
const server = express()
const User = require('./users/model')
server.use(express.json())

server.get('/', (req, res) =>{
    res.json({message:'hello world'})
})


server.get('/api/users', async (req, res) =>{
    try{
        const users = await User.find()
        res.json(users)
        console.log(users)

    } catch(err) {
        res.status(500).json({
            message:err.message,
            customMessage:'The Users could not be retrieved'
        })
    }
})
 //fixing code 
server.get('/api/users/:id', async (req, res) =>{
    try{
        const {id} = req.params
        const user = await User.findById(id)
        console.log(user)
        if(!user){
            res.status(404).json({
                message: `User with id ${id} does not exist`
            })
        }else{
            res.status(200).json(user)
        }
    }catch(err){
        res.status(500).json({
            message:err.message,
            customMessage: 'Error not found.'
        })
    }
})

server.post('/api/users', async (req, res) => {
    try {
        const { name, bio } = req.body
        if(!name || !bio) {
            res.status(400).json({
                message: "Please provide name and bio for user"
            })
        } else {
            const newUser = await User.insert({name, bio})
            res.status(201).json(newUser)
        }
    } 
    catch (err) {
        res.status(500).json({
            message: "There was an error while attempting to save the user"
        })
    }
})

server.delete('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deletedUser = await User.remove(id)
        if(!deletedUser) {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        } else {
            res.status(201).json(deletedUser)
        }
    }
    catch {
        res.status(500).json({
            message: "The user could not be removed"
        })
    }
})

server.put('/api/users/:id', async (req, res) => {
    try {
        const { name, bio } = req.body
        const { id } = req.params
        const user = await User.findById(id)
        if(!user) {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        } else if(!name || !bio) {
            res.status(400).json({ message: "Please provide name and bio for the user" })
        } else {
            const updatedUser = await User.update(id, {name, bio})
            res.status(200).json(updatedUser)
        }
    }
    catch {
        res.status(500).json({
            message: "The user information could not be modified"
        })
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
