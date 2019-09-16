const express = require('express')
const userService = require('./service')
const router = express.Router()


authenticate =  (req, res)  => {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ 
            message: 'email or password is incorrect' }))
        .catch(err => next(err));
}

register =  (req, res, next) => {
    userService.create(req.body)
        .then((response) => res.json(response))
        .catch(err => next(err));
}


 getAll =  (req, res, next) => {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}


get= (req, res, next) =>{
    userService.get(req.params.id)
        .then(user => res.json(user))
        .catch(err=> next(err))
}

update =  (req, res, next) =>{
    userService.update(req.params.id, req.body)
        .then(user=> res.json(user))
        .catch(err => next(err))
}

_delete =  (req, res, next) => {
    userService.delete(req.params.id)
        .then((user) =>{
                if(user){
                   return res.json({message:`user with id ${user.id}, deleted successfully`});
                }
                else{
                    return res.json({message:`user with id ${req.params.id}, does not exist`})
                }
        })
        .catch(err => console.log(err));
}


router.post('/signin', authenticate)
router.post('/signup', register)
router.get('/', getAll)
router.get('/:id', get)
router.put('/:id', update);
router.delete('/:id', _delete)



module.exports = router ;