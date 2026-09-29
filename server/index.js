require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const taskSchema = new mongoose.Schema({
  title: String
});
const Task = mongoose.model('Task', taskSchema);

if (!process.env.MONGO_URI) {
  console.error("FATAL ERROR: MONGO_URI is not defined in environment variables.");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    if (tasks.length === 0) {
      return res.json([{ id: 1, title: 'Learn GitHub Actions' }, { id: 2, title: 'Deploy to EC2' }]);
    }
    res.json(tasks.map(t => ({ id: t._id, title: t.title })));
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
