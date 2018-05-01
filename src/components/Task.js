import React, { Component } from 'react';

class Task extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: '',
            done: false
        }
    }

    componentDidMount = () => {
        this.setState({
            name: this.props.name,
            done: this.props.done
        })
    }

    submitTaskToEdit = (name) => {
        console.log('task to edit in Task.js ', name);
        //this.props.handleEditTask(name);
    }
    
    submitTaskToRemove = (name) => {
        console.log('task to remove in Task.js ', name);
        //this.props.handleRemoveTask(name)
    }

    render(){
        const { name, done } = this.state;

        return (
            <div className="task">
                <input type="checkbox" defaultChecked={done} />
                <span onClick={() => this.submitTaskToEdit(name)}>{name}</span>
                <span id="delete-t" onClick={() => this.submitTaskToRemove(name)}>X</span> 
            </div>
            )

    }
}

export default Task;