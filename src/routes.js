const path = require("path");
const Router = require('koa-router')
const multer = require("@koa/multer");
const handleValidationError = require("./middleware/validationErrors");
const {register, confirm} = require("./controllers/registration");
const {login} = require("./controllers/login");
const {logout} = require("./controllers/logout");
const { getAdds, getAd, addCreation } = require('./controllers/ads')
const {createDeal, getDeals, changeDealStatus, cancelDealRequest} = require("./controllers/deals");
const {getNotifications, getCountOfUnreadNotifications} = require("./controllers/notifications");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join('./public'))
  },
  filename: (req, file, cb) => {
    const splittedName = file.originalname.split('.')
    let type = splittedName[splittedName.length - 1]
    cb(null, `${file.fieldname}-${Date.now().toString(16)}.${type}`)
  }
})

const limits = {
  Fields: 10,// number of non-file fields
  FileSize: 500 * 1024,// fileSize in b
  Files: 5// files
}
const upload = multer({storage,limits})

const router = new Router({prefix: '/api'})

router.post('/register', handleValidationError, register)
router.post('/confirm', handleValidationError, confirm)
router.post('/login', handleValidationError, login);
router.post('/logout', handleValidationError, logout);
router.post('/createAdd', handleValidationError, upload.array('images'), addCreation);
router.get('/getAdds', handleValidationError, getAdds);
router.get('/getAdDetail/:id', handleValidationError, getAd);
router.post('/createDeal', handleValidationError, createDeal);
router.get('/getDeals/:role/:id', handleValidationError, getDeals);
router.patch('/changeDealStatus', handleValidationError, changeDealStatus);
router.delete('/cancelDealRequest/:id/:role', handleValidationError, cancelDealRequest);
router.get('/notifications/:id', handleValidationError, getNotifications);
router.get('/countOfUnreadNotifications/:id', handleValidationError, getCountOfUnreadNotifications);

module.exports = router.routes()
