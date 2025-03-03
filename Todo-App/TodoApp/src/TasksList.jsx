import Task from "./Task";
import PropTypes from 'prop-types';

function TasksList({ tasks }) {
  return (
    <>
      {tasks.map(task => (
        <Task key={task.id} content={task.content} />
      ))}
    </>
  );
}
TasksList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired
    })
  ).isRequired
};

export default TasksList;