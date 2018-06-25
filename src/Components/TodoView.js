import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import deleteButton from '../Images/delete.svg';

const styles = {
  view: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    marginLeft: 'auto',
  }
};

const TodoView = ({checkedValue, todoValue, inputValue, handleChange, removeTodo, unique, styleObject}) => {
  let input;
  return (
    <div style={Object.assign(styleObject,styles.view)}>
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
        <Button size="small" onClick={() => removeTodo(unique)} style={styles.button}>
          <img src={deleteButton} />
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
  styleObject: PropTypes.object,
}