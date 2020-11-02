const express = require("express");
const User = require("../schema/User");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const Reminder = require("../schema/Reminder");
const Note = require("../schema/Note");
const Habit = require("../schema/Habit");

router.get("/", (req, res, next) => {
    console.log(req);
    res.json({ lol: "paarker" });
});

router.post("/signup", async (req, res, next) => {
    console.log(req.body);
    let { username, fullName, password } = req.body;
    try {
        if (!username || !fullName || !password) {
            res.status(500);
            res.send({ msg: "Send all fields..." });
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        const userCheck = await User.find(
            { username: username },
            (error, users) => {
                if (error) throw new Error("Internal error finding user.");
                console.log("Existing user: ", users);
                return users;
            },
        );

        if (userCheck.length)
            return res.send(`The username "${username}" is already in use.`);
        const newUser = new User({
            username: username,
            password: encryptedPassword,
            fullName: fullName,
        });
        newUser.save();
        const token = jwt.sign({ userId: newUser.id }, process.env.APP_SECRET, {
            expiresIn: "1d",
        });
        // res.cookie("token", token, {
        //     httpOnly: false,
        //     secure: false,
        //     maxAge: 1000 * 60 * 60 * 24 * 7,
        //     path: '/'
        // })
        res.send({
            token,
            user: newUser,
        });
    } catch (err) {
        console.log("ERROR SIGNING UP", err);
    }
});

router.post("/login", async (req, res, next) => {
    console.log("LOGGING IN", req.body);
    let { username, password } = req.body;
    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            res.status(500);
            res.send({ msg: `${username} could not be found` });
        }
        const valid = await bcrypt.compare(password, user.password);
        if (valid) {
            console.log(user);
            const token = jwt.sign({ user }, process.env.APP_SECRET);
            console.log("SIGNING COOKIE");
            // res.cookie("token", token, {
            //     httpOnly: false,
            //     secure: false,
            //     maxAge: 1000 * 60 * 60 * 24 * 7,
            //     sameSite: 'None'
            // })
            console.log(token);
            res.json({
                token,
                user,
            });
        } else {
            res.status(500);
            res.send({ msg: `Invalid credentials` });
        }
    } catch (err) {
        console.log("ERROR LOGGING IN", err);
    }
});

router.post("/reminder", async (req, res, next) => {
    console.log("NEW REMINDER", req.body);
    try {
        let { description, reminderDate, notificationId, userId } = req.body;
        const newReminder = new Reminder({
            description,
            reminderDate,
            notificationId,
            userId,
        });
        newReminder.save();
        res.send({ msg: "Successfully saved reminder" });
    } catch (err) {
        console.log(err);
        res.status(500);
        res.send({ msg: `Could not save reminder` });
    }
});

router.get("/reminders", async (req, res, next) => {
    try {
        console.log(req.query, req.params);
        let { userId } = req.query;
        var ObjectId = require("mongoose").Types.ObjectId;
        let reminders = await Reminder.find({ userId: new ObjectId(userId) });
        if (reminders.length) {
            res.send({
                msg: "Successfully retrieved user reminders",
                data: reminders,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500);
        res.send({ msg: `Could not get reminders` });
    }
});

router.get("/notes", async (req, res, next) => {
    try {
        console.log(req.query, req.params);
        let { userId } = req.query;
        var ObjectId = require("mongoose").Types.ObjectId;
        let notes = await Note.find({ userId: new ObjectId(userId) });
        if (notes.length) {
            res.send({ msg: "Successfully retrieved user notes", data: notes });
        }
    } catch (err) {
        console.log(err);
        res.status(500);
        res.send({ msg: `Could not get notes` });
    }
});

router.post("/notes", async (req, res, next) => {
    try {
        let { userId, type, body } = req.body;
        let newNote = new Note({
            userId,
            type,
            body,
        });
        newNote.save();
        res.send({ msg: "Note created" });
    } catch (err) {
        console.log(err);
        res.status(500);
        res.send({ msg: `Could not save note` });
    }
});

router.get("/habits", async (req, res, next) => {
    try {
        console.log(req.query, req.params);
        let { userId } = req.query;
        var ObjectId = require("mongoose").Types.ObjectId;
        let habits = await Habit.find({ userId: new ObjectId(userId) });
        if (habits.length) {
            res.send({
                msg: "Successfully retrieved user habits",
                data: habits,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500);
        res.send({ msg: `Could not get habits` });
    }
});

router.post("/habits", async (req, res, next) => {
    try {
        let { userId, label, color } = req.body;
        let newHabit = new Habit({
            userId,
            label,
            color,
            startDate: new Date(),
            trackedDays: [],
        });
        newHabit.save();
        res.send({ msg: "Note created" });
    } catch (err) {
        console.log(err);
        res.status(500);
        res.send({ msg: `Could not save habit` });
    }
});

module.exports = router;
