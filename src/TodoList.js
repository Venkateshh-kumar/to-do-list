// src/TodoList.js
import React, { useState } from 'react';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';
import './TodoList.css';

const TodoList = () => {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null); // State to store the ID of the task being edited

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const addTask = (e) => {
    e.preventDefault();
    if (task.trim()) {
      if (editId) {
        
        setTodos(todos.map(todo => (todo.id === editId ? { ...todo, text: task } : todo)));
        setEditId(null); 
      } else {
        
        setTodos([...todos, { id: Date.now(), text: task, completed: false }]);
      }
      setTask(''); 
    }
  };

  const deleteTask = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const startEditing = (id, text) => {
    setEditId(id); 
    setTask(text); 
  };

  return (
    <Container>
      <h1 className="my-4">To-Do List</h1>
      <Form onSubmit={addTask}>
        <Form.Group controlId="taskInput">
          <Form.Control
            type="text"
            value={task}
            onChange={handleInputChange}
            placeholder={editId ? 'Edit your task' : 'Add a new task'}
          />
        </Form.Group>
        <Button id='btn' variant="primary"  type="submit">
          {editId ? 'Update Task' : 'Add Task'}
        </Button>
      </Form>

      <ListGroup className="my-4">
        {todos.map(todo => (
          <ListGroup.Item key={todo.id} className={todo.completed ? 'completed' : ''}>
            <Form.Check
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTaskCompletion(todo.id)} // Toggle the completion status
              label={
                <span
                  style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
                >
                  {todo.text}
                </span>
              }
            />
            <Button variant="warning" onClick={() => startEditing(todo.id, todo.text)} className="ml-2">
              Edit
            </Button>
            <Button variant="danger" onClick={() => deleteTask(todo.id)} className="float-right">
              Delete
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default TodoList;
