const path = require("path")
const Router = require('koa-router')
const multer = require("@koa/multer")
const handleValidationError = require("./middleware/validationErrors")
const {register, confirm} = require("./controllers/registration")
const {login} = require("./controllers/login")
const {logout} = require("./controllers/logout")
const { getAds, getAd, adCreation, getUserAds, updateAd} = require('./controllers/ads')
const { addToFavorite, checkIsFavorite, deleteFromFavorite, getFavorite } = require('./controllers/favorite')
const {createDeal, getDeals, changeDealStatus, cancelDealRequest} = require("./controllers/deals")
const {getNotifications, getCountOfUnreadNotifications} = require("./controllers/notifications")
const { createPaymentForm, getBillInfo, createBill } = require('./controllers/payments')

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
router.post('/login', handleValidationError, login)
router.post('/logout', handleValidationError, logout)
router.post('/createAd', handleValidationError, upload.array('images'), adCreation)
router.patch('/updateAd', handleValidationError, upload.array('images'), updateAd)
router.get('/getAds', handleValidationError, getAds)
router.get('/getUserAds/:id', handleValidationError, getUserAds)
router.get('/getAdDetail/:id', handleValidationError, getAd)
router.post('/createDeal', handleValidationError, createDeal)
router.get('/getDeals/:role/:id', handleValidationError, getDeals)
router.patch('/changeDealStatus', handleValidationError, changeDealStatus)
router.delete('/cancelDealRequest/:id/:role', handleValidationError, cancelDealRequest)
router.get('/notifications/:id', handleValidationError, getNotifications)
router.get('/countOfUnreadNotifications/:id', handleValidationError, getCountOfUnreadNotifications)
router.get('/getPaymentLink/:dealId/:amount', handleValidationError, createPaymentForm)
router.get('/getBillInfo/:billId', handleValidationError, getBillInfo)
router.post('/createBill', handleValidationError, createBill)
router.put('/addToFavorite', handleValidationError, addToFavorite)
router.put('/deleteFromFavorite', handleValidationError, deleteFromFavorite)
router.get('/checkIsFavorite/:UserId/:adId', handleValidationError, checkIsFavorite)
router.get('/getFavorite/:UserId', handleValidationError, getFavorite)

module.exports = router.routes()
