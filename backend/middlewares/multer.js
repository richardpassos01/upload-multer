const multer = require('multer')
const path = require('path')

const maxSize = 10 * 1000 * 1000

const storage = multer.memoryStorage()

const fileFilter = function (req, files, cb) {
  const ext = path.extname(files.originalname).toLowerCase()
  const allowed = ['.png', '.jpg', '.jpeg', '.pdf']
  if (allowed.includes(ext)) {
    cb(null, true)
  } else {
    cb({
      code: 'UNSUPPORTED_MEDIA_TYPE'
    })
  }
}

module.exports = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: maxSize
  }
}).any()