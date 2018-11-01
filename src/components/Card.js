import React, { Component } from 'react';
import TasksList from './TasksList';


class Card extends Component {

    handleEditCard = (e) => {
        console.log('target in handleEdit in card ', e.target);
        let { id } = this.props;
        this.props.toggleEditCard(id, e.target);

    }

    handleRemoveCard = () => {
        let { id } = this.props;
        console.log('card to remove in Card.js ', id);
        this.props.removeCard(id);
    }

    handleSubmitTasks = (tasks) => {
        let { id } = this.props;
        console.log('submitting new tasks in card ', tasks);
        console.log('id submitting new tasks in card ', id);
        this.props.submitTasks(id, tasks);
    }

    render () {
        console.log('props in card ', this.props);
        const { id, title, description, listId, tasks } = this.props;
        return (
            <div className="card" style={listId === 'completed' ? { backgroundColor: '#B9C7D1' } : null}>
                <h3 id="title" onClick={this.handleEditCard}>{title}</h3>
                <span id="delete-c" onClick={this.handleRemoveCard}>
                    <i className="fas fa-trash-alt"></i>
                </span>
                <hr />
                <div className="card-details">
                    <p id="description" onClick={this.handleEditCard}>{description}</p>
                <TasksList
                    listId={listId}
                    cardId={id}
                    tasks={tasks || []}
                    handleSubmitTasks={this.handleSubmitTasks}
                />
                </div>
                <hr />
                <p>Card Move Options ...</p>
            </div>
        )
    }
}

export default Card;