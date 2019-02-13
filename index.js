// implement your API here
const express = require('express');

const server = express();

server.use(express.json());

const db = require('./data/db')

// C // C // C // C // C // C // C // C // C // C // C // C // C // C // 
server.post('/api/users', (req, res) => {
    const user = req.body;
    db.insert(user)
    .then(user => {
        res.status(200).json({ success:true, user })
    })
    .catch(({code, message}) => {
        res.status(code).json({success: false, message})
    })
 });

// R // R // R // R // R // R // R // R // R // R // R // R // R // R 
server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
        res.status(200).json({success: true, users});
    })
    .catch(err => {
        res.status(500).json({success: false, errorMessage:"The users info could not be retrieved."})
    })
    
});

server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    db.findById(userId)
    .then(user => {
        if (user) {
            res.status(200).json({success: true, user})
        } else {
            res.status(404).json({errorMessage:"The users with the specified ID doesn't exist"})
        }
    })
    .catch(err => {
        res.status(500).json({success:false, errorMessage:"the user info couldn't be retrieved."})
    })
})


// U // U // U // U // U // U // U // U // U // U // U // U // U // U // 
server.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const changes =req.body;
   
        if (!changes.name || !changes.bio) {
            res.status(400).json({success: false, errorMessage:"please provide name and bio for the user!"});
        } else {
            db.update(userId,changes)
            .then(updated => {
                if (updated) {
                    db.find()
                    .then(users => res.status(200).json(users))
                } else {
                    res.status(404).json({error:'The user information could not be modified.'})
                }
            })
            .catch(err => res.status(500).json({error: "the user info couldn't be modified."})
            )
        }
    });

// D // D // D // D // D // D // D // D // D // D // D // D // D // D // 
server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;

    db
    .remove(userId)
    .then(deleted => {
        res.status(204).end();
    })
    .catch(({code, message}) => {
        res.status(code).json({success: false, message:"the user can not be removed."})
    })
})


server.listen(3000, () => {
    console.log('\n*** running on port 3000 ***\n');
});