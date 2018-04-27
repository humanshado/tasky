import React, { Component } from 'react';
import Task from './Task';
import AddTaskForm from './AddTaskForm';

class Tasks extends Component {
    constructor (props) {
        super(props);
        
        this.state = {
            tasks: this.props.tasks
        }
    }

    addTask = () => {
        console.log('Adding new task ...');
    }

    render() {
        console.log('props in TasksList ', this.props);

        let tasks = this.props.tasks.map((task) => (
            <li key={task.id}>
               <Task 
                    name={task.name}
                    done={task.done}/>
            </li>
        ));
        return (
            <div className="taskslist">
                <ul>{tasks}</ul>
                {this.props.listId !== "completed" &&
                    <AddTaskForm />
                }
            </div>
        )
    }
}

export default TasksList;