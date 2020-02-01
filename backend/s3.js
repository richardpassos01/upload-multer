const AWS = require('aws-sdk')
AWS.config.loadFromPath('./awsConfig.json')
const s3Config = new AWS.S3({ 
    params: { 
        Bucket: 'temp'
    }
})

exports.uploadToS3 = (params) => {
    return s3Config.putObject(params).promise()
}

exports.getToS3 = (key) => {
    return s3Config.getObject({
        Key: decodeComponent(key) 
    }).promise()
}
