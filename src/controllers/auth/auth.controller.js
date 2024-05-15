const {hash, compare, genSalt} = require('bcrypt')
const registerSchema = require('../../validators/registerValidation')
const user = require('../../models/user.model')
const loginSchema = require('../../validators/loginValidator')
const httpRegisterUser = async (req, res)=>{
    try {
        // Validate the request body 
        const {error} = registerSchema.validate(req.body)
        const {password, ...rest}= req.body
        if (error) {
            return res.status(400).json({
                status: false,
                message: error.message,
                data: null
            })
        }

        //hash the password
        const salt = await genSalt(10)
        console.log(salt)
        const hashedPassword = await hash(password, salt)
        //create the user
        const data = new user({
            password:hashedPassword,
            ...rest
        })

        await data.save()
        // do not include password in the response 
        const responseData = data.toObject();
        delete responseData.password



        return res.status(201).json({
            status: true,
            message: `user with id ${data._id} created successfully`,
            responseData
        })
    } catch (error) {
        return res.status(400).json({
            status: false,
            data: null,
            message: error.message
        })
    }
}
const httpLoginUser = async (req, res)=>{
    try {
        //validate req.body
        const {error} = loginSchema.validate(req.body)
        const {password, email} = req.body
        if (error) {
            return res.status(400).json({
                status: false,
                message: error.message,
                data: null
            })
        }

        // fuind the user by email
        const User = await user.findOne({email});
        if(!User){
            return res.status(404).json({
                status: false,
                message: "user not found",
                data: null
            });
        }
        //compare password
        const isMatch = await compare(password, User.password);
        if (!isMatch){
            return res.status(400).json({
                status: false,
                message: "invalid credentials",
                data: null
            });
        }

        // do not include password in the response

        const responseData = User.toObject();
        delete responseData.password;


        //respond appropriately
        return res.status(200).json({
            status: true,
            message: "Login sucesfully",
            data: responseData,

        })

    } catch (error) {
        return res.status(400).json({
            status: false,
            data: null,
            message: error.message
        }) 
    }
}

module.exports={
    httpLoginUser,
    httpRegisterUser
}