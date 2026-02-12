const express = require('express');
const route = express.Router();

const { StudentCreation, loginStudent, getProfile, Logout } = require('../router/authStudent');
const { AdminRegistration, LoginAdmin } = require('../router/authAdmin');
const {StudentMiddleware} = require('../middleware/auth');
const applyLeave = require('../router/studentLeave');
const FeedbackCreation = require('../router/studentFeedback');
const createComplaint = require('../router/studentComplaint');


route.post('/student/Register/v1',StudentCreation)
route.post('/student/Login/v1',loginStudent)
route.post('/admin/Register/v1',AdminRegistration)
route.post('/admin/Login/v1',LoginAdmin)
route.post('/student/logout',StudentMiddleware,Logout)
route.get('/student',StudentMiddleware,getProfile)
route.post('/student/applyleave/v2',StudentMiddleware,applyLeave)
route.post('/student/feedback/v2',StudentMiddleware,FeedbackCreation)
route.post('/student/complaint/v2',StudentMiddleware,createComplaint)

module.exports =route;
