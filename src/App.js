import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import './App.css';

const styles = {
  card: {
    minWidth: 400,
  },
};

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      query: '',
      extra: [{
        key: 322,
        content: 'Buy neha a present',
      }],
      inutValue: ' ',
    }
    this.__storeValue = this.__storeValue.bind(this);
  }
  __storeValue(event){
    if (event.key === 'Enter') {
      let newItem= {
        key: Date.now(),
        content: event.target.value,
      };
      this.setState((prevState) =>{
      return{
        extra:prevState.extra.concat(newItem)
        };
      })
    }
  }

  render() {
    const { extra } = this.state;
    let renderList = extra.map((item) => {
      return <div key={item.key}>
          <p>{item.content}</p>
        </div>;
    })
    return (
    <div className="App">
      <h3>Todo</h3>
      <Card style={styles.card}>
        <CardContent>
          <Input
            placeholder="New Todo"
            inputProps={{
              'aria-label': 'Description',
            }}
            ref="someName"
            fullWidth={true}
            onKeyPress={this.__storeValue}
          />
          {renderList}
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
