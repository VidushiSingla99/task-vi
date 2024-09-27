import React, { useState } from 'react';
import { useTodos } from './TodoContext';

const TodoList = () => {
  const { state, dispatch } = useTodos();
  const [newTodo, setNewTodo] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);  // Track which todo is being edited
  const [editText, setEditText] = useState(''); 

  // Add new todo
  const addTodo = () => {
    if (newTodo.trim() === '') return;

    dispatch({
      type: 'ADD_TODO',
      payload: { id: Date.now(), text: newTodo, completed: false },
    });
    setNewTodo(''); // Clear input
  };

  const saveEdit = (id) => {
    if (editText.trim() === '') return;
    dispatch({
      type: 'EDIT_TODO',
      payload: { id, newText: editText },
    });
    setEditTodoId(null);  // Exit edit mode
    setEditText('');
  };

  return (
    <div className='flex-col'>
      <h2 class="flex-col add-todo-hdng">Add your task here</h2>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new task..."
        className='inpt-frm-entry'
      />
      <button onClick={addTodo} className='mt-3'>Click me to Bulk your Task ! </button>
      <h2 class="flex-col add-todo-hdng pt-4">Below Is Your TASK LIST</h2>
      <h3 class="flex-col add-todo-hdng">( Tap On The Task to strike them )</h3>
      <ul>
        {state.todos.map((todo) => (
          <li key={todo.id} className='tsk-item m-3'>

              {editTodoId === todo.id ? (
              // Show input if editing this todo
              <>
                <input
                  className='inpt-frm-entry'
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button className="ml-3 mr-3" onClick={() => saveEdit(todo.id)}>Save</button>
                <button className="ml-3 mr-3" onClick={() => setEditTodoId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span
                  onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
                  style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                >
                  {todo.text}
                </span>
                <button className="ml-3 mr-3" onClick={() => setEditTodoId(todo.id) || setEditText(todo.text)}>
                  Edit
                </button>
                <button  className="ml-3 mr-3" onClick={() => dispatch({ type: 'REMOVE_TODO', payload: todo.id })}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;