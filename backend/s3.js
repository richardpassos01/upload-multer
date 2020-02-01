const AWS = require('aws-sdk')
AWS.config.loadFromPath('./awsConfig.json')
const s3Config = new AWS.S3({ 
    params: { 
        Bucket: 'temp'
    }
})

exports.uploadToS3 = ({ Body, Key, ACL }) => {
    return s3Config.putObject({
        Key,
        Body,
        ACL
    }).promise()
}

exports.getToS3 = (key) => {
    return s3Config.getObject({
        Key: decodeComponent(key) 
    }).promise()
}
