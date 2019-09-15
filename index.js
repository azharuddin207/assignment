const express = require('express')
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const port = process.env.port || 3000

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('./db')
const {User} = require('./model')

app.post('/api/signup', async (req, res)=>{
    try {
        if(await   User.findOne({email:req.body.email}))
         return res.status(200).json({message: 'user already registered.'});;
        let password = ''
         if (req.body.password) {
            password = bcrypt.hashSync(req.body.password, 10);
        }

        const user =  new User({
            nickname: req.body.nickname,
            email : req.body.email,
            password : password
        })

        const response = await user.save();
        res.status(201).send({
            response,
            message:"user registered succesfully"
        })
    }
    catch(err){
        console.log(err)
    }
})




app.post('/api/signin', async(req, res)=>{
    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(200).json({message: 'user not registered'});
  
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(200).json({message: 'invalid email or password'});
  
    const token = jwt.sign({sub: user.id}, "somesecretnumber");
    console.log(token);
    res.status(200).json({token, message:'success'});
})




// app.get('/api/signup', async(req, res)=>{
//     try{
//         const users =  await User.find()
//         res.send(users)
//     }
//     catch(err){
//             console.log(err)
//     }
// })




app.listen(port, ()=>console.log(`listening on port ${port}`))