const {User} = require('./model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


 authenticate = async ({ email , password }) => {
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
        const { password , ...userWithoutHash } = user.toObject();
        console.log(user.toObject())
        const token = jwt.sign({ sub: user.id }, "secretkey");
        return {
            ...userWithoutHash,
            token
        };
    }
}


create = async (userParam) =>{
    if( await User.findOne({email:userParam.email}))
          throw 'Username "' + userParam.email + '" is already taken';
    let password = ''
    if (userParam.password) {
       password = bcrypt.hashSync(userParam.password, 10);
   }

   const user =  new User({
       nickname: userParam.nickname,
       email : userParam.email,
       password : password
   })

    return await user.save();
}


_delete = async (id) =>{
    return await User.findByIdAndRemove(id)
}

getAll = async () =>{
    return await User.find()
}


module.exports = {authenticate, create, delete:_delete, getAll}