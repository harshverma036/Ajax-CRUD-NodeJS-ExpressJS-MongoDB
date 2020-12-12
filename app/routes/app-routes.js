const express = require('express');
const router = express.Router();
// const dbcontroller = require('../controller/db-controller');
const { home, getAllUsers, insertUser, deleteUser, getUpdateRecords, updateUser } = require('../controller/db-controller');

router.get('/', home);
router.get('/getUsers', getAllUsers);
router.post('/insertUsers', insertUser);
router.post('/delUser/', deleteUser);
router.get('/getupdaterecord/:updateID', getUpdateRecords);
router.post('/update', updateUser);

module.exports = router;