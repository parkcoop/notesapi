const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Note = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("Note", Note);
