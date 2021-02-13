const { size, has } = require('lodash')
const { push, search, update, read, remove } = require('../DAL')

function createTweet(body) {
    return push("tweets", body)
}

function readTweet(_id) {
    return search("tweets", "_id", _id)
}

function updateTweet(body, _id) {

    const post_id = body.post_id;
    delete body.post_id

    return new Promise(function(resolve, reject) {
        read(`tweets/${post_id}`).then(function(snap) {
            if (snap.val() && size(snap.val()) && has(snap.val(), '_id')) {
                // checking the created and requested user are equal 
                // TODO check based on priviliges
                if (snap.val()._id === _id) {
                    update(`tweets/${post_id}`, body).then(function(snap) {
                        resolve({ status: "success" })
                    })
                } else {
                    resolve({ status: "failure" })
                }
            }
        })

    })
}

function deleteTweet(body, _id) {
    const post_id = body.post_id;
    delete body.post_id

    return new Promise(function(resolve, reject) {
        read(`tweets/${post_id}`).then(function(snap) {
            if (snap.val() && size(snap.val()) && has(snap.val(), '_id')) {
                // checking the created and requested user are equal
                // TODO check based on priviliges
                if (snap.val()._id === _id) {
                    remove(`tweets/${post_id}`).then(function(snap) {
                        resolve({ status: "success" })
                    })
                } else {
                    resolve({ status: "failure" })
                }
            }
        })
    })
}

module.exports = {
    createTweet,
    readTweet,
    updateTweet,
    deleteTweet
}