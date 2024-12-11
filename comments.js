// Create web server
const express = require('express');
const app = express();
const port = 3000;

// Create comments
let comments = [
  {
    id: 1,
    username: 'alice',
    comment: 'Hello, World!'
  },
  {
    id: 2,
    username: 'bob',
    comment: 'Nice to meet you!'
  }
];

// Create a new comment
app.post('/comments', (req, res) => {
  const newComment = {
    id: comments.length + 1,
    username: req.body.username,
    comment: req.body.comment
  };
  comments.push(newComment);
  res.status(201).json(newComment);
});

// Get all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Get a comment by id
app.get('/comments/:id', (req, res) => {
  const comment = comments.find(comment => comment.id === parseInt(req.params.id));
  if (!comment) {
    res.status(404).json({ message: 'Comment not found' });
  } else {
    res.json(comment);
  }
});

// Update a comment by id
app.put('/comments/:id', (req, res) => {
  const comment = comments.find(comment => comment.id === parseInt(req.params.id));
  if (!comment) {
    res.status(404).json({ message: 'Comment not found' });
  } else {
    comment.username = req.body.username;
    comment.comment = req.body.comment;
    res.json(comment);
  }
});

// Delete a comment by id
app.delete('/comments/:id', (req, res) => {
  const index = comments.findIndex(comment => comment.id === parseInt(req.params.id));
  if (index === -1) {
    res.status(404).json({ message: 'Comment not found' });
  } else {
    comments.splice(index, 1);
    res.status(204).send();
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});