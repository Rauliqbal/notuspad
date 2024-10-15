import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title must be filled']
  },
  content: {
    type: String,
    required: [true, 'Content must be filled']
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true })

export default mongoose.model('Note', noteSchema)