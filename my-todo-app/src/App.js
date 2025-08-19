import React, { useState } from 'react';
import { Plus, Trash2, Check } from 'lucide-react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date().toLocaleString()
      }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="app">
      <div className="container">
        {/* Header */}
        <div className="header">
          <h1>Todo App</h1>
          <p>Stay organized and productive</p>
        </div>

        {/* Stats */}
        <div className="stats-card">
          <div className="stats-grid">
            <div className="stat-item blue">
              <div className="stat-number">{totalCount}</div>
              <div className="stat-label">Total Tasks</div>
            </div>
            <div className="stat-item green">
              <div className="stat-number">{completedCount}</div>
              <div className="stat-label">Completed</div>
            </div>
            <div className="stat-item orange">
              <div className="stat-number">{totalCount - completedCount}</div>
              <div className="stat-label">Remaining</div>
            </div>
          </div>
        </div>

        {/* Add Todo Form */}
        <div className="add-todo-card">
          <div className="add-todo-form">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="What needs to be done?"
              className="todo-input"
            />
            <button onClick={addTodo} className="add-button">
              <Plus size={18} />
              Add
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="filter-card">
          <div className="filter-tabs">
            {['all', 'active', 'completed'].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`filter-tab ${filter === filterType ? 'active' : ''}`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Todo List */}
        <div className="todo-list-card">
          {filteredTodos.length === 0 ? (
            <div className="empty-state">
              {filter === 'all' ? 'No tasks yet. Add one above!' :
               filter === 'active' ? 'No active tasks!' :
               'No completed tasks yet!'}
            </div>
          ) : (
            <div className="todo-list">
              {filteredTodos.map((todo) => (
                <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`toggle-button ${todo.completed ? 'checked' : ''}`}
                  >
                    {todo.completed ? <Check size={14} /> : null}
                  </button>
                  
                  <div className="todo-content">
                    <div className={`todo-text ${todo.completed ? 'strikethrough' : ''}`}>
                      {todo.text}
                    </div>
                    <div className="todo-date">
                      {todo.createdAt}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="delete-button"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {totalCount > 0 && (
          <div className="footer">
            {completedCount === totalCount ? 
              "🎉 All tasks completed! Great job!" :
              `${totalCount - completedCount} task${totalCount - completedCount !== 1 ? 's' : ''} remaining`
            }
          </div>
        )}
      </div>
    </div>
  );
}

export default App;