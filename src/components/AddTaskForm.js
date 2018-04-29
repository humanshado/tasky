import React, { Component } from 'react';

class AddTaskForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            taskName: ''
        }
    }

    submitTaskName = (e) => {
        e.preventDefault();
        console.log('submitting new task name ...', e.target.value);
        this.props.addTask(this.state.taskName);
        this.setState({ taskName: '' });
    }

    updateTaskName = (e) => {
        console.log('new task name in AddTaskForm ', e.target.value);
        this.setState({ taskName: e.target.value });
    }

    render () {
        return (
                <form onSubmit={this.submitTaskName}>
                    <input 
                        type="text"
                        className="addtask-form"
                        value={this.state.taskName}
                        onChange={(e) => this.updateTaskName(e)}
                        placeholder="add a new task and press enter" 
                        />
                    <input type="submit" value="+" style={{ display: "none"}}/>
                </form>
        )
    }
}

export default AddTaskForm;