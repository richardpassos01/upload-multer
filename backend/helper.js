const  s3bucket = '/awspath/files'
const { uploadToS3, getToS3 } = require('./s3')

exports.uploadDocument = async (req, res, next) => {
    try {
        await uploadToS3({
            Body: req.files[0].buffer,
            Key: s3bucket + req.files[0].originalname,
            ACL: 'private'
        })
        
        res.status(204).end()
    } catch(err) {
        console.error(err)
        res.status(500).end()
    }
}

exports.getDocument = async (req, res, next) => {
    try {
        const file = await getToS3({
            key: req.params.fileName + s3bucket
        })

        return file
    } catch(err) {
        console.error(err)
        res.status(500).end()
    }
}
