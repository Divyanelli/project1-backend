const express = require("express");

const {
  addNote,
  getAllNotes,
  updateNote,
  deleteNote,
  displayNote,
} = require("../controllers/notes");

const { verifyToken } = require("../middlewares/authMiddleware");

// const { handleNoteIdParam } = require("../middlewares/noteMiddleware");
var router = express.Router();

// router.param("noteId", handleNoteIdParam);

router.post("/add", verifyToken, addNote);
router.get("/getallnotes", verifyToken, getAllNotes);
router.delete("/delete/:noteId", deleteNote);
router.put("/update/:noteId", verifyToken, updateNote);
router.get("/update/:noteId", verifyToken, displayNote);

module.exports = router;
