
import { useState } from 'react';
import './App.css';
import TasksList from './TasksList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskContent, setTaskContent] = useState('');

  function handleAdd() {
    if (taskContent.trim() === '') return; 
    const newTask = {
      id: Date.now(),
      content: taskContent,
    };
    setTasks([...tasks, newTask]);
    setTaskContent('');
  }

  console.log(tasks);
  
  
  return (
    <>
      <div>
        <h1 className='text-3xl mt-6'>Simple TODO App</h1>
        <div className='container max-w-[750px] px-5'>
          <div className='add-new-task'>
            <h3 className='mb-2'>Add New Task</h3>
            <div className='input-container'>
              <input
                type="text"
                className='pl-3 p-2 border-2 border-solid rounded-2xl outline-0 text-slate-950'
                value={taskContent}
                onChange={(e) => setTaskContent(e.target.value)}
              />
              <button 
                className='add'
                onClick={handleAdd}
              >
                Add
              </button>
            </div>
          </div>
          <TasksList tasks={tasks} />
        </div>
      </div>
    </>
  );
}

export default App;