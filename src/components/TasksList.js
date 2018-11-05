import React, { Component } from 'react';
import Task from './Task';
import AddTaskForm from './AddTaskForm';
import sortBy from 'sort-by';

class TasksList extends Component {
    constructor (props) {
        super(props);

        this.state = {
            tasks: [],
            editingTask: false,
            taskToEdit: '',
            taskId: '',
            done: false
        }
    }

    componentDidMount = () => {
        this.setState({ tasks: this.props.tasks });
    }

    addTask = ({taskId, name}) => {
        let { tasks } = this.state;

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

    toggleTask = (taskId, name, done) => {
        this.setState({
            taskId,
            taskToEdit: name,
            editingTask: true
        });
    }

    removeTask = (taskId) => {
        const { tasks } = this.state;
        let newTasks = tasks.filter(t => t.taskId !== taskId);
        this.setState({
             tasks: newTasks
         }, () => {
             this.props.handleSubmitTasks(this.state.tasks);
         });
    }

    markTaskComplete = (taskId, name, done) => {
        const { tasks } = this.state;
        let newTasks = tasks.filter(t => t.taskId !== taskId);
        this.setState({
            tasks: newTasks.concat({ taskId, name, done }),
            taskId,
            done
        }, () => {
            this.props.handleSubmitTasks(this.state.tasks);
        })
    }

    render() {

        if (this.state.tasks) {
            this.state.tasks.sort(sortBy('taskId'));
        }

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
                        markTaskComplete={this.markTaskComplete}
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