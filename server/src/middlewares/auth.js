import jwt from 'jsonwebtoken'

const verifyToken = async (req, res, next) => {
   const token = req.headers['authorization']
   if (!token) return res.status(401).json({ message: "Unauthenticated" })

   // Verification token
   jwt.verify(token, process.env.SECRET_TOKEN, (error, decoded) => {
      if (error) return res.status(403).json({ message: "Invalid token" })
      req.user = decoded
      next()
   })
}

export default verifyToken