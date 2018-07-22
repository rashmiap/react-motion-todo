import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import '../Style/App.css';
import TodoView from './TodoView';
import FormGroup from '@material-ui/core/FormGroup';
import Title from './Title';
import TodoForm from './TodoForm';
import clearAll from '../Images/clear-all.svg';
import happy from '../Images/happy.svg';
import { Motion, spring } from 'react-motion';

const styles = {
  card: {
    width: 400,
    marginBottom: '40px',
    overflow: 'unset',
  },
  clear: {
    margin: '0 auto'
  }
};
const initialStyle = {
    x: 0,
    opacity: 1,
}

const finalStyle = {
    x: spring(385 ,{stiffness: 120, damping: 17}),
    opacity: spring(0),
}
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      todoList: [],
      inputValue: '',
      completedTasks: 0,
      dismissed: false,
    }
    this.__handleChange = this.__handleChange.bind(this);
    this.__storeValue = this.__storeValue.bind(this);
    this.__clearAll = this.__clearAll.bind(this);
    this.__handleAnimationEnd = this.handleAnimationEnd.bind(this);
  }
  componentDidMount() {
   //const height = document.getElementByClass('container').clientHeight;
   //console.log(height);
 }

  __storeValue(event){
    if (event.key === 'Enter' && event.target.value.length > 0) {
      let newItem= {
        key: Date.now(),
        content: event.target.value,
        checkedValue: false,
      };
      this.setState({
        inputValue: '',
        dismissed: false,
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
    const completedTasks = this.state.completedTasks;
    let counter = 0;
    let selectedObj = updateList.find(function (obj) { return obj.key === id; })
    selectedObj.checkedValue = !value;
    updateList.reduce((id, thing) => {
      if (thing.checkedValue) {
        counter = counter + 1;
      }
    }, []);
    this.setState({
      todoList: updateList,
      completedTasks: counter,
      a: false,
    })
  };
  __removeTodo(id){
    const completedTasks = this.state.completedTasks;
    let counter = 0;
    const updateList = this.state.todoList.filter((todo) => {
      if(todo.key !== id) return todo;
    });
    updateList.reduce((id, thing) => {
      if (thing.checkedValue) {
        counter = counter + 1;
      }
    }, []);
    this.setState({
      todoList: updateList,
      completedTasks: counter,
    });
  }
  __clearAll(){
    this.setState({
      dismissed: true,
      completedTasks: 0,
    })
  }
  handleAnimationEnd () {
    this.setState({
      todoList: []
    })
  }
  render() {
    const { todoList, inputValue, completedTasks, dismissed } = this.state;
    let renderList = todoList.map((item) => {
      return <Motion defaultStyle={initialStyle}
                            style={dismissed? finalStyle : initialStyle }
                            onRest={this.__handleAnimationEnd}
                            key={item.key}>
                        {
                                (interpolatedStyle) => (
                        <TodoView key={item.key} todoValue={item.content} checkedValue={item.checkedValue} uniqueKey={item.key} styleObject={{
                                            transform: `translateX(${interpolatedStyle.x}px)`,
                                            opacity: interpolatedStyle.opacity,
                                        }} handleChange={this.__handleChangeChecked.bind(this,item.checkedValue,item.key)} removeTodo={this.__removeTodo.bind(this,item.key)}/>
      )}
      </Motion>
    })
    return (
    <div className="App">
      <Title heading="Todo"/>
        <Card style={styles.card}>
          <CardContent>
            <TodoForm placeholderText="New Todo" inputValue={inputValue} handleChange={this.__handleChange} addTodo={this.__storeValue} />
              {
                todoList.length > 0 ?
                <div>
                  <p>{completedTasks} / {todoList.length}</p>
                  <FormGroup>
                    {renderList}
                  </FormGroup>
                   <CardActions>
                <Button size="small" onClick={this.__clearAll} style={styles.clear}>
                  <img src={clearAll} alt="clear all" />
                </Button>
              </CardActions>
              </div>:
              <div className="App-Empty">
                <img src={happy} alt="face happy"/>
                <p>Nothing to do! </p>
              </div>
            }
          </CardContent>
        </Card>
    </div>
    );
  }
}
export default App;
