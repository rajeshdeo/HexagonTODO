import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TaskForm from './Form';
import TaskList from './List';

const TaskApp = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:5000/tasks');
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (task) => {
    try {
      const response = await axios.post('http://localhost:5000/tasks', task);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleEditTask = async (updatedTask) => {
    try {
        let newData= prompt("Enter new Data");
         console.log(updatedTask,newData)
      await axios.patch(`http://localhost:5000/tasks/${updatedTask}`, newData);
      const updatedTasks = tasks.map((task) =>
        task.id === updatedTask ? { ...task,taskName: newData } : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    // <Router>
      <div>
        <h1>Todo App with CRUD Operations</h1>
        {/* <Route exact path="/"> */}
          <TaskForm onSubmit={handleAddTask} />
        {/* </Route>
        <Route exact path="/tasks"> */}
          <TaskList tasks={tasks} onEdit={handleEditTask}
         
           onDelete={handleDeleteTask} />
        {/* </Route> */}

      </div>
    
  );
};

export default TaskApp;
