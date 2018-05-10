import React, { Component } from 'react';
import Task from './Task';
import AddTaskForm from './AddTaskForm';

class TasksList extends Component {
    constructor (props) {
        super(props);
        
        this.state = {
            tasks: [],
            editingTask: false,
            taskToEdit: '',
            taskId: ''
        }

        this.addTask = this.addTask.bind(this);
    }

    componentDidMount = () => {
        this.setState({ tasks: this.props.tasks });
    }
    

    addTask = ({taskId, name}) => {
        let { tasks } = this.state;
        console.log('Adding new task in TasksList...', name);

        if(this.state.editingTask){
            let currTasks = tasks.filter(t => t.taskId !== taskId);
            this.setState({ tasks: currTasks.concat({ taskId, name, done: false }),
            editingTask: false 
            }, () => {
                this.props.handleSubmitTasks(this.state.tasks);
            })
        }else {
            this.setState({
            tasks: tasks.concat({ taskId, name, done: false }),
            editingTask: false
            }, () => {
                this.props.handleSubmitTasks(this.state.tasks);
            })
        }
    }

    toggleTask = (taskId, name) => {
        this.setState({ 
            taskId,
            taskToEdit: name,
            editingTask: true
        });
    }

    removeTask = (taskId) => {
        console.log('task to remove in TasksList.js ', taskId);
        const { tasks } = this.state;
        let newTasks = tasks.filter(t => t.taskId !== taskId);
        this.setState({
             tasks: newTasks
         }, () => {
             this.props.handleSubmitTasks(this.state.tasks);
         });
    }

    render() {
        //console.log('props in TasksList ', this.props);
        console.log('state in TasksList ', this.state);

        let tasks = this.state.tasks.map((task) => (
            <li key={task.taskId}>
                {this.state.editingTask && this.state.taskId === task.taskId
                    ? <AddTaskForm 
                        taskId={task.taskId}
                        name={task.name}
                        addTask={this.addTask}/>
                    : <Task
                        taskId={task.taskId}
                        name={task.name}
                        done={task.done}
                        toggleTask={this.toggleTask}
                        removeTask={this.removeTask}
                    /> }
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