import User from "../model/User.js"
import Role from "../model/Role.js"
import { validationResult } from "express-validator"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import  secret from '../config.js';

const generateAccessToken  = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({message: "Registration failed" , errors});
            }
            const {username, password} = req.body;
            let regex =  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/g

            if(!(password.match(regex))){
                return res.status(400).json({message: "Invalid password"});
            }
            const candidate = await User.findOne({username});
            if(candidate){
                return res.status(400).json({message: "This username is already exist."});
            }
            const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password 
        console.log(password, salt);
        const hashPassword = await bcrypt.hash(password, salt)
            const userRole = await Role.findOne( {value:"USER"})
            const user = new User({username, password:  hashPassword, roles: [userRole.value]});
            await user.save()
            return res.json({message: "User successfully registered"})
        } catch (error) {
            console.log(error);
            res.status(400).json({message: "Registration error"});
        }

    }

    async login(req, res) {
        try {
            
            const {username, password} = req.body;
            const user = await User.findOne({username});
            if(!user){
                return res.status(400).json({message: "User is not defnied"});
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if(!validPassword){
                return res.status(400).json({message: "Password is invalid"});
            }
            const token = generateAccessToken(user._id, user.roles);
            return res.json({token})
        } catch (error) {
            console.log(error);
        res.status(400).json({message: "Login error"})  
        }

    }

    async getUsers(req, res) {
        try { 
            console.log();
            const users = await User.find()
            res.json(users)
        } catch (error) {
        res.status(400).json({message: "Get users error"})
        }

    }
}
 
export default new authController();    