var express = require("express")
var app = express();
var router = express.Router();
var UserController = require("../controllers/UserController")
var AdminAuth = require("../middleware/AdminAuth")

router.get('/users', AdminAuth, UserController.index)
router.get("/user/:id", AdminAuth, UserController.findUser)
router.post('/user', AdminAuth, UserController.create)
router.put("/user/:id", AdminAuth, UserController.edit)
router.delete("/user/:id", AdminAuth, UserController.remove)
router.post("/recoverPassword", UserController.recoverPassword)
router.post("/changePassword", UserController.changePassword)
router.post("/login", UserController.login)

module.exports = router;