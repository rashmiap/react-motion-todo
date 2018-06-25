import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';

const TodoView = ({checkedValue, todoValue, inputValue, handleChange, removeTodo, unique}) => {
  let input;
  return (
    <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedValue}
                onChange={() => handleChange(checkedValue, unique)}
                value={inputValue}
              />
            }
            label={todoValue}
          />
        <Button size="small" onClick={() => removeTodo(unique)}>
         X
      	</Button>
    </div>
  );
};

export default TodoView;

TodoView.propTypes = {
	todoValue: PropTypes.string,
	checkedValue: PropTypes.bool,
	handleChange: PropTypes.func,
  removeTodo: PropTypes.func,
}