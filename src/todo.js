import React, { Component } from 'react';


class Todo extends Component {

    state = {
        hide: 'false'
    }
    //hide the task when user click on the task typed 
    finishtask = () => {
        if (this.state.hide === 'false') {
            this.setState({ hide: 'hidden' })
        } else {
            this.setState({ hide: 'false' })
        }
    }
    // test = (event) => {
    //     let index = event.target.vlue
    //     this.props.removeTask(index)
    //     console.log(event.target.value)
    // }

    render() {
        return (
            <li onClick={this.finishtask} className={this.state.hide}>{this.props.TaskData.title} 🖌
                <button className="b"
                    type='Remove'
                    name="removeTask"
                    onClick={() => this.props.removeTask(this.props.index)}>
                    <span role="img" aria-label="emoji">❌</span>
                </button>
            </li>
        );
    }
}

export default Todo;