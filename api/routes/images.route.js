const imageController = require("../controller/image.controller");
const { authJwt } = require("../middleware");
const multer = require('multer');

const upload = multer({ dest: '../../images/' })

module.exports = (app) => {
  app.post(
    "/api/image",
    [
        authJwt.verifyToken, 
        authJwt.isVendeur,
        upload.single('image')
    ],
    imageController.uploadImage
  );
};
