import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new Schema(
   {
      username: {
         required: [true, 'Name must be filled'],
         type: String,
      },
      email: {
         required: [true, 'Email must be filled'],
         type: String,
      },
      password: {
         required: [true, 'Password must be filled'],
         type: String,
      },
      role: {
         required: true,
         type: String,
         default: "user",
      },
      registrationDate: {
         required: true,
         type: Date,
         default: Date.now()
      }
   },
);


userSchema.pre("save", function (next) {
   const user = this

   if (!user.isModified('password')) return next()

   bcrypt.genSalt(10, (error, salt) => {
      if (error) return next(error)

      bcrypt.hash(user.password, salt, (error, hash) => {
         if (error) return next(error)

         user.password = hash
         next()
      })
   })
})

export default mongoose.model("User", userSchema);
