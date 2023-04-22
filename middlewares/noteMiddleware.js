exports.handleNoteIdParam = (req, res, next, id) => {
  // console.log("this log is fro handlenoteid", id);
  req.noteId = id;
  next();
};
