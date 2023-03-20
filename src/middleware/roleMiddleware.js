import 'dotenv/config'
import jwt from 'jsonwebtoken'


export default function (roles) {
    return function (req, res, next) {
        try {
            const token = req.headers.authorization?.split(' ')[1]

            if (!token)
                return res.sendStatus(401)

            const { roles: userRoles } = jwt.verify(token, process.env.SECRET)

            const permission = userRoles.every(role => {
                return roles.includes(role)
            })

            if (permission)
                next()
            else
                res.sendStatus(403)
        } catch (error) {
            res.sendStatus(403)
        }
    }
}