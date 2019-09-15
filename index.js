const express = require('express')
const bodyParser = require('body-parser');
const errorHandler = require('./error-handler')
const app = express()
const port = process.env.port || 3000
require('./db')
const userController = require('./controller')



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use('/api/user',  userController );
app.use(errorHandler);





app.listen(port, ()=>console.log(`listening on port ${port}`))