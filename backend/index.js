const express = require('express')
const app = express()
const port = 3000
const maxSize = 10 * 1000 * 1000
const multer = require('multer')
const path = require('path')
const uuid = require('uuid')
const helper = require('./helper')

const storage = multer.diskStorage({
    destination: path.join(__dirname, '/temp/'),
    filename: function (req, file, callback) {
        return callback(null, uuid.v4() + path.extname(file.originalname))
    }
});

app.use(express.json())
app.use(multer({
    storage,
    limits: { 
        fileSize: maxSize 
    }
}).any());

app.listen(port)

app.post('/uploadDocument',
(...args) => helper.uploadDocument(...args)
)