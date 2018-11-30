const router = require("koa-router")();
const userService = require("../services/user");

router.post('/user/login', userService.login);
router.post('/user/register', userService.register);
router.post('/user/list', userService.getUsersList);
router.get('/user/checkUserName/:username', userService.checkUserName);
router.get('/user/getUserInfo', userService.getUserInfo);
router.post('/user/delete', userService.deleteUsers);
router.post('/user/modifyPassword', userService.modifyPassword);


module.exports = router;