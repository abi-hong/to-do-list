import React, { Component } from 'react';
import TodoItem from '../ToDoList/TodoItem';

class TodoItemList extends Component {

    shouldComponentUpdate(nextProps, nextState) {
      return this.props.todos !== nextProps.todos;
    }
  
    render() {
      const { todos, onToggle, onRemove, onPrivate } = this.props;
  
      const todoList = todos.map(
        ({id, text, checked, privated}) => (
          <TodoItem
            id={id}
            text={text}
            checked={checked}
            privated={privated}
            onToggle={onToggle}
            onRemove={onRemove}
            onPrivate={onPrivate}
            key={id}
          />
        )
      );
  
      return (
        <div>
          {todoList}    
        </div>
      );
    }
}
  
export default TodoItemList;