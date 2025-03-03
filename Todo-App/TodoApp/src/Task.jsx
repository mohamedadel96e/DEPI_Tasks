import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faCheck, faPen, faCircleXmark, faHourglassHalf, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import PropTypes from 'prop-types';

function Task({ content }) {

  const [taskContent, setTaskContent] = useState(content)
  const [taskState, setTaskState] = useState("")
  const [taskEdit, setTaskEdit] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const [willDelete, setWillDelete] = useState(false)

  function handleDelete() {
    setWillDelete(true)
  }
  
  if (willDelete) 
    return null
  
  function handleEdit() {
    setTaskEdit(prev => !prev)
  }

  function handleTaskState(event) {
    const { name } = event.currentTarget; 
    if (taskState === name)
      setIsSpinning(prev => !prev)
    
    setTaskState(name); 
  }

  function handleContentChange(event) {
    setTaskContent(event.currentTarget.value)
  }


  console.log(taskState);
  
  return (
    <div 
      className="task flex-col md:flex-row items-center gap-y-2" 
      style={{
        border: taskState === "done" ? "2px solid #4d9a9e" : ""
      }}>
      <div className = 'task-container self-start'>
        {taskState === "done" ?
          <FontAwesomeIcon 
            icon={faThumbsUp}
            className = "text-blue-500 "
          />
          : <FontAwesomeIcon 
            icon = {faSpinner} 
            spinPulse = {isSpinning}
            style = {{color: "#4d9a9e"}}
          />
        }
        
        { taskEdit ?
          <input 
            type="text" 
            value={taskContent}
            className='max-w-[65vw] md:max-w-[500px] text-slate-950 outline-0 focus:border-none pl-3 p-2 rounded-2xl'
            onChange={handleContentChange}
          /> : 
          <div className='max-w-56 truncate	sm:max-w-sm self-start'>{taskContent}</div>
        }
      </div>
      
      <div className = 'buttons items-center'>
        <button name = "remove" onClick={handleDelete}>
          <FontAwesomeIcon 
            icon = {faCircleXmark} 
            className = 'text-xl text-red-700' 
          />
        </button>

        <button name = "edit" onClick={handleEdit}>
          <FontAwesomeIcon 
            icon = {faPen} 
            className = 'text-l text-gray-400' 
          />
        </button>

        <button name = "pending" onClick = {handleTaskState}>
          <FontAwesomeIcon 
            icon = {faHourglassHalf} 
            className = 'text-l text-cyan-500' 
          />
        </button>

        <button name = "done" onClick = {handleTaskState}>
          <FontAwesomeIcon 
            icon = {faCheck} 
            className = 'text-xl text-green-500' 
          />
        </button>
      </div>
    </div>
  );
}

Task.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Task;