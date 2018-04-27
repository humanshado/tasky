import React, { Component } from 'react';

class AddTaskForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: ''
        }
    }

    submitTask = (e) => {
        e.preventDefault();
        console.log('submitting new task...');
    }

    render () {
        return (
            <form onSubmit={this.submitTask}>
                <input 
                    type="text"
                    className="addtask-form"
                    value={this.state.name}
                    onChange={() => this.setState({ name })}
                    placeholder="add a new task and press enter" 
                    />
            </form>
        )
    }
}

export default AddTaskForm;