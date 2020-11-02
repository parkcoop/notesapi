const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Habit = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        startDate: {
            type: String,
            required: true,
        },
        trackedDays: {
            type: Array,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("Habit", Habit);
