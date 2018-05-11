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
        console.log('done in componentDidMount ', this.props.done);
        this.setState({
            taskId: this.props.taskId,
            name: this.props.name,
            done: this.props.done
        })
    }

    submitTaskToEdit = (taskId, name) => {
        console.log('task to edit in Task.js ', name);
        this.props.toggleTask(taskId, name, this.state.done);
    }
    
    submitTaskToRemove = (taskId) => {
        console.log('task to remove in Task.js ', taskId);
        this.props.removeTask(taskId);
    }

    submitTaskStatus = (e) => {
        console.log('e.target.checked in Task ', e.target.checked);
        console.log('done in state in Task ', this.state.done);

        this.setState({ 
            done: e.target.checked
        }, () => {
            const { taskId, name, done } = this.state;
            this.props.markTaskComplete(taskId, name, done);
            console.log('done in Task on change', done);
        })
    }

    render(){
        console.log('props in Task.js ', this.props);
        console.log('state in Task.js ', this.state);
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