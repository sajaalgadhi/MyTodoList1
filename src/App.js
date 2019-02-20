import React, { Component } from 'react';
import './App.css';
import Todo from './todo';
import axios from 'axios';
import Quotes from './quotes';

class App extends Component {
  state = {
    newtask: {
      title: ''
    },
    tasks: []
    , quote: ''
    , qouteAuthr: ''
  }

  submitfunction = (event) => {
    event.preventDefault();
    const copy = this.state.tasks.slice(0);
    copy.push(this.state.newtask);
    this.setState({
      tasks: copy,
      newtask: {
        title: ''
      }
    })

  }

  Formfunction = (event) => {

    const newData = event.target.value;

    const originState = this.state.newtask;

    var copy = Object.assign({}, originState);

    const key = event.target.name;

    copy[key] = newData;

    this.setState({
      newtask: copy
    })


  }
  componentDidMount() {


    axios({
      method: 'get',
      url: 'https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en'
    })
      .then((response) => {
        console.log(response.data.quoteText)
        console.log(response.data.quoteAuthor)
        this.setState({
          quote: response.data.quoteText,
          qouteAuthr: response.data.quoteAuthor,


        })
      })
      .catch((error) => {
        console.log(error);

      })
  }

  removeTask = (index) => {
    //take a copy of the array and delete array content depends on index 
    const copytasks = this.state.tasks.splice(index, 1);
    //updat state
    this.setState({
      newtask: copytasks
    })
  }
  // clearTasks = () => {
  //   const copytasks = this.state.tasks.splice(0);
  //   //updat state
  //   this.setState({
  //     newtask: copytasks
  //   })
  // }






  render() {
    const TaskList = this.state.tasks.map((TaskData, index) => {
      return <Todo TaskData={TaskData} index={index} removeTask={this.removeTask} />
    });
    console.log(this.state.qouteAuthr)
    // const divStyle = {
    //   backgroundImage: `url(${this.state.wallpaper})`,
    // }style={divStyle}
    return (
      <div className='one'>

        <h1>My Todo List</h1>

        <form onSubmit={this.submitfunction}>

          <input placeholder='what is your plan for today?' id='star' type='text' name='title' size='50' onChange={this.Formfunction} value={this.state.newtask.title} />
          <input className="mybutton" type='submit' value='New Task' />
        </form>

        <div className='two'>
          <ul >
            {TaskList}
          </ul>
          <Quotes qoute={this.state.quote} quoteAuther={this.state.qouteAuthr} />
        </div>
        <footer>Made with ♥️ By:Saja AlGadhi</footer>

      </div>




    );
  }
}


export default App;
