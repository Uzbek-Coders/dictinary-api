import jwt from 'jsonwebtoken'
import  secret from '../config.js'
export default function (roles) {
    return function (req,res, next) {
        if(req.method == "OPTIONS") {
            next()
        }
        try {
                const token = req.headers.authorization.split(' ')[1]
                if(!token) {
                    return res.status(403).json({message: "User is not authorization"})
                }
                const {roles: userRoles } = jwt.verify(token, secret)
                let hasRole = false;
               
                userRoles.forEach(role => {
                    if(roles.includes(role)) {
                        hasRole = true
                    }
                })
                if(!hasRole){
                    return res.status(403).json({message: "User has not a role."})
                }
                if(userRoles[0] == roles[1]){
                    next()
                } else {
                    return res.status(403).json({message: "You don't have permission to access this page    "})
                }

        } catch (error) {
            console.log(error)
            return res.status(403).json({message: "User is not authorization"})
        }
    }
}