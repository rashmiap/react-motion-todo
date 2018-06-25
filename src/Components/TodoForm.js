import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';

const TodoForm = ({addTodo, placeholderText, inputValue, handleChange}) => {
  let input;
  return (
    <div>
      <Input
        ref={node => {
          input = node;
        }} 
        placeholder={placeholderText}
        value={inputValue}
        onChange={handleChange}
        fullWidth={true}
        onKeyPress={addTodo}
      />
    </div>
  );
};

export default TodoForm;