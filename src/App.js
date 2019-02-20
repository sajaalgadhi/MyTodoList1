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
  //this function will submit user input 
  submitfunction = (event) => {
    event.preventDefault();//prevent auto reload of the page 
    const copy = this.state.tasks.slice(0);//make copy of the tasks array 
    copy.push(this.state.newtask);//push  the new input to the array 
    this.setState({//update the copy with the new data of the array 
      tasks: copy,
      newtask: {
        title: ''
      }
    })

  }
  //this function will get the data user typed 
  Formfunction = (event) => {
    //get data from the user 
    const newData = event.target.value;
    //get the original state
    const originState = this.state.newtask;
    //assign new data to the copy of the tasks array 
    var copy = Object.assign({}, originState);
    //add new data from user to the copy 
    const key = event.target.name;

    copy[key] = newData;
    //update the copy with the new data that user typed 
    this.setState({
      newtask: copy
    })


  }
  componentDidMount() {

    //add API quotes to the page 
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
  //this function will remove each task indivisually by click button 
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
    //loop throug the tasks array 
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

        <form onSubmit={this.submitfunction} >

          <input placeholder='what is your plan for today?' id='star' type='text' name='title' size='50' onChange={this.Formfunction} value={this.state.newtask.title} />
          <input className="mybutton" type='submit' value='New Task' />
          \
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
