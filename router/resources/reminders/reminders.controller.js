const Reminder = require('../schema/Reminder')

const getReminders = async (req, res, next) => {
    try {
        console.log(req.query, req.params)
        let { userId } = req.query
        var ObjectId = require('mongoose').Types.ObjectId; 
        let reminders = await Reminder.find({userId: new ObjectId(userId)})
        if (reminders.length) {
            res.send({msg: "Successfully retrieved user reminders", data: reminders})
        }
    }
    catch(err) {
        console.log(err)
        res.status(500)
        res.send({msg: `Could not get reminders`})
    }
}

const newReminder = async (req, res, next) => {
    console.log("NEW REMINDER", req.body)
    try {
        let { description, reminderDate, notificationId, userId } = req.body
        const newReminder = new Reminder({
            description, 
            reminderDate, 
            notificationId, 
            userId
        })
        newReminder.save()
        res.send({msg: 'Successfully saved reminder'})
    }
    catch(err) {
        console.log(err)
        res.status(500)
        res.send({msg: `Could not save reminder`})
    }
}

module.exports = {
    getReminders,
    newReminder
}