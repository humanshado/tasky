import React, { Component } from 'react';

class Tasks extends Component {
    render () {
        console.log('props in Tasks ', this.props);

        let tasks = this.props.tasks.map((task) => (
            <li key={task.id}>
                <input type="checkbox" defaultChecked={task.done} />
                {task.name}
            </li>
        ));
        return (
            <div className="taskslist">
                <ul>{tasks}</ul>
                {this.props.listId !== "completed" &&
                    <input type="text"
                            className="addtask-form"
                            placeholder="add a new task and press enter" />
                }
            </div>
        )
    }
}

export default Tasks;