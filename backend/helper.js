const  s3bucket = '/awspath/files'
const { uploadToS3, getToS3 } = require('./s3')
const debug = require('debug')('upload-debug')

exports.uploadDocument = async (req, res) => {
    try {
        const [{ buffer, originalname }] = req.files
        
        await uploadToS3({
            Body: buffer,
            Key: s3bucket + originalname,
            ACL: 'private'
        })
        
        res.status(204).end()
    } catch(err) {
        debug('erro', err)
        res.status(500).end()
    }
}

exports.getDocument = async (req, res) => {
    try {
        const file = await getToS3({
            key: req.params.fileName + s3bucket
        })

        return file
    } catch(err) {
        debug('erro', err)
        res.status(500).end()
    }
}
