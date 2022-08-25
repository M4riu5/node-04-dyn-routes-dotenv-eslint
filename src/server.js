'use strict';
console.log('server.js');

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()


  //middleware
app.use(morgan('dev'))


  //routes
app.get('/', (req, res) => {
    res.send('Hello World')
  })



  const port = 3000
  app.listen(port, () => console.log(`server is runining`))