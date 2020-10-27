const express = require('express')
const User = require('../schema/User')
const router = express.Router()

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const moment = require('moment')


router.get('/', (req, res, next) => {
    console.log(req)
    res.json({lol:'paarker'})
})

router.post('/signup', async (req, res, next) => {
    console.log(req.body)
    let { username, fullName, password } = req.body
    try {
        if (!username || !fullName || !password) return new Error('Missing required paramaters.')
        const encryptedPassword = await bcrypt.hash(password, 10)
        const userCheck = await User.find({ username:username }, 
            (error, users) => {
                if (error) throw new Error('Internal error finding user.')
                console.log('Existing user: ', users)
                return users
        })
            
        if (userCheck.length) return new Error(`The username "${username}" is already in use.`)
        const newUser = new User({
            username: username,
            password: encryptedPassword,
            fullName: fullName
        })
        newUser.save()
        const token = jwt.sign({userId: newUser.id}, process.env.APP_SECRET, { expiresIn: "1d"})
        // res.cookie("token", token, {
        //     httpOnly: false,
        //     secure: false,
        //     maxAge: 1000 * 60 * 60 * 24 * 7,
        //     path: '/'
        // })
        res.send({
            token,
            user: newUser
        })
    }
    catch (err) {
        console.log("ERROR SIGNING UP", err)
    }

})

router.post('/login', async (req, res, next) => {
    let { username, password } = req.body
    try {
        const user = await User.findOne({ username:username })
        if (!user) return new Error('No user found')
        const valid = await bcrypt.compare(password, user.password)
        if (valid) {
            console.log(user)
            const token = jwt.sign({ user }, process.env.APP_SECRET)
            console.log("SIGNING COOKIE")
            // res.cookie("token", token, {
            //     httpOnly: false,
            //     secure: false,
            //     maxAge: 1000 * 60 * 60 * 24 * 7,
            //     sameSite: 'None'
            // })
            console.log(token)
            res.json({
                token,
                user,
            })
        } else res.send(new Error('Invalid password'))
    }
    catch (err) {
        console.log("ERROR LOGGING IN", err)
    }
})

module.exports = router