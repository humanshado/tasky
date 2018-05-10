import React, { Component } from 'react';

class AddTaskForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            taskId: '' || this.props.taskId,
            taskName: '' || this.props.name
        }
    }
 
    submitTask = (e) => {
        const { taskId, taskName } = this.state;
        e.preventDefault();
        console.log('submitting new task name ...', taskName);
        this.props.addTask({taskId: !taskId ? Date.now() : taskId, name: taskName});
        this.setState({ taskId: '', taskName: '' });
    }

    updateTask = (e) => {
        console.log('new task name in AddTaskForm ', e.target.value);
        this.setState({taskName: e.target.value });
    }

    render () {
        return (
                <form onSubmit={this.submitTask}>
                    <input 
                        type="text"
                        className="addtask-form"
                        value={this.state.taskName}
                        onChange={(e) => this.updateTask(e)}
                        placeholder="add a new task and press enter"
                        style={{textAlign: 'center'}} 
                        />
                    <input type="submit" value="+" style={{ display: "none"}}/>
                </form>
        )
    }
}

export default AddTaskForm;