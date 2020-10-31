const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Reminder = new Schema({
    description: {
        type: String,
        required: true
    },
    reminderDate: {
        type: String,
        required: true,
    },
    notificationId: {
        type: String,
        required: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("Reminder", Reminder)