import { useEffect, useReducer } from 'react';
import { todoReducer } from './todoReducer';

const init = () => {
  return JSON.parse(localStorage.getItem('todos')) || [];
};

export const useTodos = () => {
  const [todos, dispatchTodo] = useReducer(todoReducer, [], init);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleNewTodo = (todo) => {
    const action = {
      type: '[TODO] Add Todo',
      payload: todo,
    };
    dispatchTodo(action);
  };

  const handleDeleteTodo = (todoId) => {
    const action = {
      type: '[TODO] Remove Todo',
      payload: todoId,
    };
    dispatchTodo(action);
  };

  const handleToggleTodo = (todoId) => {
    const action = {
      type: '[TODO] Toggle Todo',
      payload: todoId,
    };
    dispatchTodo(action);
  };

  const pendingTodosCount = todos.filter(({ done }) => !done).length;

  return {
    todos,
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo,
    todosCount: todos.length,
    pendingTodosCount,
  };
};
