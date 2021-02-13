const { Router } = require('express');
const router = Router()
const { newTweetSchema, updateTweetSchema, deleteTweetSchema } = require('../tweet/TweetSchema')
const { validateRequest } = require('../middlewares/Validation')
const { verifyToken } = require('../middlewares/VerifyToken');
const { createTweet, readTweet, updateTweet, deleteTweet } = require('./TweetController');
const { size } = require('lodash');

// TODO: check privilege 
router.post('/create', verifyToken, validateRequest(newTweetSchema), function(req, res) {
    req.body._id = req._id
    createTweet(req.body).then(function(snap, err) {
        if (err) return res.sendStatus(500)
        return res.send({ status: "success", id: snap.getKey() })
    })
})

router.get('/read', verifyToken, function(req, res) {
    // TODO pagination
    readTweet(req._id).then(function(snap, err) {
        if (err) return res.sendStatus(500)
        if (size(snap.val())) {
            return res.send({ status: "success", data: snap.val() })
        } else {
            return res.send({ status: "success", data: {}, message: "No data found" })
        }
    })
})

router.put('/update', verifyToken, validateRequest(updateTweetSchema), function(req, res) {
    updateTweet(req.body, req._id).then(function(data) {
        return res.send(data)
    })
})

router.delete('/delete', verifyToken, validateRequest(deleteTweetSchema), function(req, res) {
    deleteTweet(req.body, req._id).then(function(data) {
        return res.send(data)
    })
})

module.exports = router;