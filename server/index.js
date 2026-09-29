const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const tasks = [
  { id: 1, title: 'Learn GitHub Actions' },
  { id: 2, title: 'Deploy to EC2' }
];

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
