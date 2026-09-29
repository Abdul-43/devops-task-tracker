import { useEffect, useState } from 'react';

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
    if (!newTask) return;
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
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '500px', margin: '0 auto' }}>
      <h1>DevOps Task Tracker v2</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      
      <form onSubmit={addTask} style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
          placeholder="Add a new task..."
          style={{ padding: '8px', width: '70%', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '8px 15px' }}>Add Task</button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li key={task.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #ccc' }}>
            {task.title}
            <button onClick={() => deleteTask(task.id)} style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
