const imageController = require("../controller/image.controller");
const { authJwt } = require("../middleware");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
  filename: function (req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single("image");

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

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
