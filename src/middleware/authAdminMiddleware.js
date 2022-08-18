import jwt from 'jsonwebtoken'
import  secret from '../config.js'
export default function (roles) {
    return function (req,res, next) {
        if(req.method == "OPTIONS") {
            next()
        }
        try {
            console.log(req.headers.authorization)
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
                    return res.status(200).json({message: true})
                } else {
                    return res.status(403).json({message: false})
                }

        } catch (error) {
            return res.status(403).json({message: "User is not authorization"})
        }
    }
}