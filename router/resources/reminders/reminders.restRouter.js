const express = require('express')
const remindersRouter = express.Router()
const Reminder = require('../schema/Reminder')
const controller = require('./reminders.controller')


remindersRouter.get('/reminders', controller.getReminders)
remindersRouter.post('/reminder', controller.newReminder)

module.exports = remindersRouter