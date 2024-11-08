const express = require('express');
const router = express.Router();
const uuid = require('uuid');
let users = require('../../Users');

//get all users
router.get('/',(req, res) => {
    res.json(users);
});

//get user by id
router.get('/:id', (req, res) =>{
    const found = users.some(user => user.id === parseInt(req.params.id));

    if(found){
        res.json(users.filter(i => i.id === parseInt(req.params.id)))
    }else{
        res.sendstatus(400)
    }
});

//Create a new user
router.post('/',(req, res) =>{
    const newUser  = {
        id:uuid.v4(),
        name:req.body.name,
        email:req.body.email
    }
    if(!newUser.name || !newUser.email){
        return res.sendStatus(400)
    }

    users.push(newUser)
    res.json(users)
});

//Update user
router.put('/:id',(req, res) => {
    const found = users.some(x => x.id === parseInt(req.params.id));

    if(found){
        const UpdateUser = req.body;
        users.forEach(i => {
            if(i.id === parseInt(req.params.id)){
                i.name = UpdateUser.name ? UpdateUser.name:i.name;
                i.email = UpdateUser.email ? UpdateUser.email:i.email;
                
            }
        });
        res.json({
            msg: 'User Updated',
            user: users.find(user => user.id === parseInt(req.params.id))
        });

    } else {
        res.status(404).json({ msg: 'User not found' });
    }
});

//Delete user
router.delete('/:id',(req, res) => {
    const found = users.some((user) => user.id === parseInt(req.params.id));
    if (found) {
        users = users.filter((user) => user.id !== parseInt(req.params.id));
        return res.json({
            msg: "User deleted",
            users,
        });
    } else {
        return res.sendStatus(404); 
    }
});

module.exports = router