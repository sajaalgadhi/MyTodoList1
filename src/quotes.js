import React, { Component } from 'react';
import App from './App'
class Quotes extends Component {
    render() {



        return (
            <div id='quote'>

                <p>“{this.props.qoute}”</p>

                <p>{this.props.quoteAuther}</p>

            </div>


        );
    }


} export default Quotes