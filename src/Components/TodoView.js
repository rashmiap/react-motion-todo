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
    boxShadow: '0 2px 32px -9px rgba(0,0,0,0.52)',
    padding: '5px 10px',
    marginBottom: '8px'
  },
  button: {
    marginLeft: 'auto',
  },
};

const TodoView = ({checkedValue, todoValue, inputValue, handleChange, removeTodo, uniqueKey, styleObject}) => {
  let input;
  return (
    <div style={Object.assign(styleObject,styles.view)} className="listView">
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedValue}
                onChange={() => handleChange(checkedValue, uniqueKey)}
                value={inputValue}
              />}
            label={todoValue}
            className={checkedValue ? 'listView-checked':''}
          />
        <Button size="small" onClick={() => removeTodo(uniqueKey)} style={styles.button} className="listView-delete" >
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
