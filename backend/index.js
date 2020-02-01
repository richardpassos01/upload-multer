const express = require('express')
const app = express()
const port = 3000
const multer = require('./middlewares/multer')
const helper = require('./helper')


app.use(express.json())
app.use(multer)

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.listen(port)

app.post('/uploadDocument',
(...args) => helper.uploadDocument(...args)
)

app.get('/getDocument/:fileName',
(...args) => helper.getDocument(...args)
)