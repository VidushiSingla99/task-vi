import React, { createContext, useReducer, useEffect, useContext } from 'react';

// Initial state loader from localStorage
const loadState = () => {
  try {
    const savedState = localStorage.getItem('todosState');
    return savedState ? JSON.parse(savedState) : { todos: [] };
  } catch (e) {
    console.warn('Error loading state from localStorage', e);
    return { todos: [] };
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('todosState', serializedState);
  } catch (e) {
    console.warn('Error saving state to localStorage', e);
  }
};

// Create a context
const TodoContext = createContext();

// Actions
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

// Reducer function
const todoReducer = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    default:
      return state;
  }
};

// TodoProvider component with localStorage persistence
export const TodoProvider = ({ children }) => {
  // Load persisted state from localStorage
  const [state, dispatch] = useReducer(todoReducer, loadState());

  // Persist state in localStorage whenever it changes
  useEffect(() => {
    saveState(state);
  }, [state]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

// Custom hook to use the TodoContext
export const useTodos = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
};
