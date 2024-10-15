import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
   const { username, email, password, role } = req.body;
   try {
      const newUser = await User.create({
         username,
         email,
         password,
         role
      })

      res.status(201).send({
         status: "Success",
         message: "User registered succesfully!",
         data: newUser,
      });
   } catch (error) {
      res
         .status(204)
         .send({ status: "Failed", message: `Error: ${error.message}` });
   }
};

export const login = async (req, res) => {
   try {
      // check email
      const user = await User.findOne({ email: req.body.email })
      if (!user) return res.status(404).json({ message: "Email not found!" })

      // check password
      const passwordValid = await bcrypt.compare(req.body.password, user.password)
      if (!passwordValid) return res.status(404).json({ mesage: "Password not found!" })

      // create token
      const token = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, {
         expiresIn: '1h'
      })

      const { password, ...user_data } = user._doc

      res.status(200).send({ status: "Success", message: "User created succesfully!", data: user_data, token: token })

   } catch (error) {
      res.status(400).send({ status: "Failed", message: `Error : ${error.message}` })
   }
};

export const getUser = async (req, res) => {
   const user = await User.findOne({
      _id: req.user.id
   })

   if (!user) return res.status(401).send({ message: "Unauthorized" })

   const { password, ...user_data } = user._doc

   return res.status(200).send({ status: "Success", message: `Hello ${user.username}`, data: user_data })
}
