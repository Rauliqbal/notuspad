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

// Get By Id
export const getNoteById = async (req, res) => {
  const { id } = req.params
  const userId = req.user.id

  try {
    if (!id) res.status(400).send({ status: "Failed", message: "Id Not Found" })
    const note = await Note.findById(id)

    if (!note) res.status(404).json({ message: "Task Not Found" })
    if (!note.user_id.equals(userId)) res.status(401).send({ message: "Unauthorized" })

    res.status(200).send({
      status: 'Success',
      message: `Get Note ${note.title}`,
      data: note
    })
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      message: `Error : ${error.message}`,
    });
  }
}

// Update By Id
export const updateNote = async (req, res) => {
  const { id } = req.params
  const userId = req.user
  const { title, content } = req.body

  try {
    const task = await Note.findByIdAndUpdate(id, {
      title,
      content
    })
    task.save()


    res.status(200).send({
      status: 'Success',
      message: 'Update Note Successfully',
      data: task
    })
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      message: `Error : ${error.message}`,
    });
  }

}

// Delete By Id
export const deleteNote = async (req, res) => {
  const { id } = req.params
  const userId = req.user.id

  try {
    const note = await Note.findByIdAndDelete(id)
    if (!note) res.status(404).json({ message: "Task Not Found" })
    if (!note.user_id.equals(userId)) res.status(401).send({ message: "Unauthorized" })

    res.status(200).send({
      status: 'Success',
      message: 'Delete Note Successfully',
      data: note
    })
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      message: `Error : ${error.message}`,
    });
  }
}