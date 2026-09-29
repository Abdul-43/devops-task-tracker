
import { useEffect, useState } from 'react';
import './index.css';
const I_HAVE_BROKEN = THE_APP_NO_QUOTES

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState(null);

  const fetchTasks = () => {
    fetch('/api/tasks')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => setTasks(data))
      .catch(err => setError(err.message));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTask })
    }).then(() => {
      setNewTask('');
      fetchTasks();
    });
  };

  const deleteTask = (id) => {
    fetch(`/api/tasks/${id}`, {
      method: 'DELETE'
    }).then(() => {
      fetchTasks();
    });
  };

  return (
    <div className="app-container">
      <h1>DevOps CI/CD Magic ✨</h1>
      {error && <p style={{ color: '#ef4444', textAlign: 'center' }}>Error: {error}</p>}
      
      <form onSubmit={addTask} className="input-form">
        <input 
          type="text" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
          placeholder="What do you need to deploy today?"
        />
        <button type="submit">Add Task</button>
      </form>

      <ul className="task-list">
        {tasks.length === 0 && !error ? (
          <p style={{ textAlign: 'center', color: '#94a3b8' }}>No tasks yet. Add one!</p>
        ) : (
          tasks.map(task => (
            <li key={task.id} className="task-item">
              <span>{task.title}</span>
              <button 
                onClick={() => deleteTask(task.id)} 
                className="delete-btn"
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
