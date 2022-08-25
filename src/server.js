'use strict';
console.log('server.js');

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(cors())
app.get('/', (req, res) => {
    res.send('Hello World')
  })

  app.listen(3000)