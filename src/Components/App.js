import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import '../Style/App.css';
import TodoView from './TodoView';
import FormGroup from '@material-ui/core/FormGroup';
import Title from './Title';
import TodoForm from './TodoForm';

const styles = {
  card: {
    minWidth: 400,
  },
};

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      todoList: [{
        key: 322,
        content: 'Buy neha a present',
        checkedValue: true,
      }],
      inputValue: '',
    }
    this.__handleChange = this.__handleChange.bind(this);
    this.__storeValue = this.__storeValue.bind(this);
    //this.__handleChangeChecked = this.__handleChangeChecked.bind(this);
    //this.__removeTodo = this.__removeTodo.bind(this);
  }
  __storeValue(event){
    if (event.key === 'Enter') {
      let newItem= {
        key: Date.now(),
        content: event.target.value,
        checkedValue: false,
      };
      this.setState({
        inputValue: '',
      })
      this.setState((prevState) =>{
      return{
        todoList:prevState.todoList.concat(newItem)
        };
      })
    }
  }
  __handleChange(event){
    this.setState({
      inputValue: event.target.value,
    })
  };
  __handleChangeChecked(value, id){
    const updateList = this.state.todoList;
    let selectedObj = updateList.find(function (obj) { return obj.key === id; })
    selectedObj.checkedValue = !value;
    this.setState({
      todoList: updateList,
    })
  };
  __removeTodo(id){
    const updateList = this.state.todoList.filter((todo) => {
      if(todo.key !== id) return todo;
    });
    this.setState({todoList: updateList});
  }
  render() {
    const { todoList, inputValue } = this.state;
    let renderList = todoList.map((item) => {
      return <TodoView key={item.key} todoValue={item.content} checkedValue={item.checkedValue} unique={item.key}
      handleChange={this.__handleChangeChecked.bind(this,item.checkedValue,item.key)} removeTodo={this.__removeTodo.bind(this,item.key)}/>
    })
    return (
    <div className="App">
      <Title />
      <Card style={styles.card}>
        <CardContent>
          <TodoForm placeholderText="New Todo" inputValue={inputValue} handleChange={this.__handleChange} addTodo={this.__storeValue} />
          <FormGroup>
          {renderList}
          </FormGroup>
        </CardContent>
        <CardActions>
          <Button size="small">Clear-all</Button>
        </CardActions>
      </Card>
    </div>
    );
  }
}

export default App;
