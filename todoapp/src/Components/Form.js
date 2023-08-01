import React, { useState } from 'react';

const TaskForm = ({ onSubmit }) => {
  const [taskName, setTaskName] = useState('');
  const [taskStatus, setTaskStatus] = useState('Complete');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!taskName.trim()) {
      newErrors.taskName = 'Task name is required';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      onSubmit({ taskName, taskStatus });
      setTaskName('');
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Task Name:
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </label>
        {errors.taskName && <span>{errors.taskName}</span>}
      </div>
      <div>
        <label>
          Task Status:
          <label>
            <input
              type="radio"
              value="Complete"
              checked={taskStatus === 'Complete'}
              onChange={() => setTaskStatus('Complete')}
            />
            Complete
          </label>
          <label>
            <input
              type="radio"
              value="Incomplete"
              checked={taskStatus === 'Incomplete'}
              onChange={() => setTaskStatus('Incomplete')}
            />
            Incomplete
          </label>
        </label>
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
