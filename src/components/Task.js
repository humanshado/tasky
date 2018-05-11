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
        this.props.toggleTask(taskId, name, this.state.done);
    }
    
    submitTaskToRemove = (taskId) => {
        this.props.removeTask(taskId);
    }

    submitTaskStatus = (e) => {
        this.setState({ 
            done: e.target.checked
        }, () => {
            const { taskId, name, done } = this.state;
            this.props.markTaskComplete(taskId, name, done);
        })
    }

    render(){
        const { taskId, name, done } = this.state;
        return (
            <div className="task">
                <input 
                    type="checkbox"
                    checked={done}
                    onClick={(e) => this.submitTaskStatus(e)}/>
                <span id="delete-t" onClick={() => this.submitTaskToRemove(taskId)}>X</span> 
                <span onClick={() => this.submitTaskToEdit(taskId)}>{name}</span>
            </div>
            )

    }
}

export default Task;