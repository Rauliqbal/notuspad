import Note from "../models/noteModel.js";

// Create
export const createNote = async (req, res) => {
  const { title, content } = req.body;

  try {
    const note = new Note({
      title,
      content,
      user_id: req.user.id,
    });

    const savedNote = await note.save()

    res.status(200).send({
      status: "Success",
      message: "Create Note Successfully",
      data: savedNote,
    });
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      message: `Error : ${error.message}`,
    });
  }
};

// Get All
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user_id: req.user.id })
    res
      .status(200)
      .send({
        status: "Success",
        message: "Get All Notes Successfully",
        data: notes,
      });
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      message: `Error : ${error.message}`,
    });
  }
};
