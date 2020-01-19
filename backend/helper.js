const AWS = require('aws-sdk')
AWS.config.loadFromPath('./awsConfig.json')
const s3Config = new AWS.S3({ 
    params: { 
        Bucket: 'temp'
    }
})
const fs = require('fs')
const  s3bucket = '/awspath/files'
const util = require('util')

exports.uploadDocument = async (req, res, next) => {
    try {
        await uploadToS3({
            filePath: req.files[0].path,
            fileName: req.files[0].filename,
            s3LocalStorage: s3bucket,
        })
        
        res.status(204).end()
    } catch(err) {
        console.error(err)
        res.status(500).end()
    }
}

exports.getDocument = async (req, res, next) => {
    try {
        const getDocument = util.promisify(getToS3)
        return getDocument({ key: req.params.fileName + s3bucket })

    } catch(err) {
        console.error(err)
        res.status(500).end()
    }
}


function uploadToS3({ filePath, fileName, s3LocalStorage }) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath,
            (err, file) => {
                if (err) {
                    reject(err)
                }
                s3Config.putObject({
                    Key:s3LocalStorage + fileName,
                    Body: file,
                    ACL: 'private'
                }, (error, uploadData) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(uploadData)
                })
            })
        })
    }

function getToS3(key, callback) {
    s3Config.getObject({
        Key: decodeComponent(key) 
    }, callback);
}