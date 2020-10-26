const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    console.log(req)
    res.json({lol:'paarker'})
})

router.post('/login', (req, res, next) => {
    console.log("LLLLLLLL", req.body)
    res.json({
        token:'ABCDEFG',
        user: {
            username: 'parkcoop',
        }
    })
})

module.exports = router