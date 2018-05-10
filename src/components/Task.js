import React, { Component } from 'react';

class Task extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            taskId: '',
            name: '',
            done: false
        }
    }

    componentDidMount = () => {
        this.setState({
            taskId: this.props.taskId,
            name: this.props.name,
            done: this.props.done
        })
    }

    submitTaskToEdit = (taskId, name) => {
        console.log('task to edit in Task.js ', name);
        this.props.toggleTask(taskId, name);
    }
    
    submitTaskToRemove = (taskId) => {
        console.log('task to remove in Task.js ', taskId);
        //this.props.handleRemoveTask(name)
    }

    render(){
        const { taskId, name, done } = this.state;

        return (
            <div className="task">
                <input type="checkbox" defaultChecked={done} />
                <span onClick={() => this.submitTaskToEdit(taskId)}>{name}</span>
                <span id="delete-t" onClick={() => this.submitTaskToRemove(taskId)}>X</span> 
            </div>
            )

    }
}

export default Task;