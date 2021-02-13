const { Router } = require('express');
const router = Router()
const { newUserSchema } = require('./UserSchema')
const { validateRequest } = require('../middlewares/Validation')
const { push, search } = require('../DAL')
const { size, has } = require('lodash')
const bcrypt = require('bcryptjs')
const config = require('../config') //.env
const jwt = require('jsonwebtoken');
const policy = require('../policy')

// CREATES A NEW USER
router.post('/signup', validateRequest(newUserSchema), function(req, res) {
    // checking whether the email already exists
    search("users", "email", req.body.email).then(function(snap) {
        const matched_emails = snap.val()

        if (size(matched_emails)) {
            for (let i in matched_emails) {
                if (has(matched_emails[i], "email") && matched_emails[i].email === req.body.email) {
                    return res.status(409).send({ code: 2, message: "resource already exists" })
                }
            }
        } else {
            req.body.password = bcrypt.hashSync(req.body.password, 8);
            // TODO: sign up for admin and super admin
            req.body.policy = policy.users
            push("/users", req.body).then(function(snapshot) {
                const token = jwt.sign({ _id: snapshot.getKey() }, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                return res.status(200).send({ status: "success", token })
            })
        }
    })

});

// LOGIN A NEW USER
router.post('/signin', function(req, res) {

    search("users", "email", req.body.email).then(function(snap) {
        const matched_emails = snap.val()
        let user = "",
            _id = ""

        if (size(matched_emails)) {
            for (let i in matched_emails) {
                if (has(matched_emails[i], "email") && matched_emails[i].email === req.body.email) {
                    user = matched_emails[i]
                    _id = i
                }
            }

            if (!_id) return res.status(404).send({ code: 2, message: "No user found." })

            // check if the password is valid
            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

            // if user is found and password is valid
            // create a token
            var token = jwt.sign({ id: _id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            // return the information including token as JSON
            res.status(200).send({ auth: true, token: token });
        }
    })

});


module.exports = router;