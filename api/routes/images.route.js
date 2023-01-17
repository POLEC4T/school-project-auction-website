const imageController = require("../controller/image.controller");
const { authJwt } = require("../middleware");
const multer = require('multer');
const fs = require('fs')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images')
    },
  filename: function (req, file, cb) {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, "IMAGE-" + Date.now() + fileName);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 4000000 },//4MB
})

module.exports = (app) => {

  app.post(
    "/api/image",
    [
        //authJwt.verifyToken, 
        //authJwt.isVendeur,
        upload.single('image')
    ],
    imageController.uploadImage
  );


  app.get('/images/:imageName', (req, res) => {
    const imageName = req.params.imageName
    const readStream = fs.createReadStream(`images/${imageName}`)
    readStream.pipe(res)
  })

};
