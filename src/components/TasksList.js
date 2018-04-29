import React, { Component } from 'react';
import Task from './Task';
import AddTaskForm from './AddTaskForm';

class TasksList extends Component {
    constructor (props) {
        super(props);
        
        this.state = {
            tasks: []
        }

        this.addTask = this.addTask.bind(this);
    }

    componentDidMount = () => {
        this.setState({ tasks: this.props.tasks });
    }
    

    addTask = (taskName) => {
        let { tasks } = this.state;
        console.log('Adding new task in TasksList...', taskName);
        this.setState({
            tasks: tasks.concat({ name: taskName, done: false }) 
        }, () => {
            this.props.handleSubmitTasks(this.state.tasks);
        })
    }

    render() {
        console.log('props in TasksList ', this.props);

        let tasks = this.state.tasks.map((task) => (
            <li key={task.id}>
                 <Task 
                    name={task.name} 
                    done={task.done}
                    addTask={this.addTask}
                />
            </li>
        ));
        return (
            <div className="taskslist">
                <ul>{tasks}</ul>
                {this.props.listId !== "completed" &&
                    <AddTaskForm addTask={this.addTask}/>
                }
            </div>
        )
    }
}

export default TasksList;