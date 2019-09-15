const express = require('express')
const userService = require('./service')
const router = express.Router()


authenticate = async (req, res)  => {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ 
            message: 'email or password is incorrect' }))
        .catch(err => next(err));
}

register = async (req, res, next) => {
    userService.create(req.body)
        .then((response) => res.json(response))
        .catch(err => next(err));
}

 _delete = async (req, res, next) => {
    userService.delete(req.params.id)
        .then((user) => res.json({message:`user with id ${user.id}, deleted successfully`}))
        .catch(err => next(err));
}
 getAll = async (req, res, next) => {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

router.post('/signin', authenticate)
router.post('/signup', register)
router.delete('/:id', _delete)
router.get('/', getAll)


module.exports = router ;