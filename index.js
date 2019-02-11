// implement your API here
const express = require('express');

const server = express();

server.use(express.json());

const db = require('./data/db')


server.get

// U
server.post('/users', (req, res) => {
    const {user} = req.body;
    
    db.users
    .add(user)
    .then(user => {
        res.status(201).json({success:true, user});
    })
    .catch(({code, message}) => {
        res.status(code).json({success: false, message});
    }); 
});

server.listen(4000, () => {
    console.log('\n*** running on port 4000 ***\n');
});