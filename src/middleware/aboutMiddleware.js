const { request } = require("express");

const aboutmidddleware = (req, res, next) => {
    const database = {email:"example@gmial.com", password: "come1"}
    const {email, password}= req.body
    try {
        if(
            email===database.email && password === database.password            
        ) 
        {
            return next()
        }
        return res.status(401).json({msg: "invalid email and password"})
      } catch (error) {
        return res.status(500).json({ msg: error.message });
      }
}
// authenticate user
module.exports = {
    aboutmidddleware
}
