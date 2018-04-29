import React, { Component } from 'react';
import TasksList from './TasksList';


class Card extends Component {

    handleEditCard = (e) => {
        //console.log('target in handleEdit in card ', e.target);   
        let { id } = this.props;
        this.props.toggleEditCard(id, e.target);
        
    }

    handleSubmitCardToRemove = (id) => {
        this.props.submitRemoveCard(id);
    }

    handleSubmitTasks = (newTasks) => {
        let { id } = this.props;
        console.log('submitting new tasks in card ', newTasks);
        console.log('id submitting new tasks in card ', id);
        this.props.submitTasks(id, newTasks);
    }

    render () {
        console.log('props in card ', this.props);
        const { id, title, description, listId, tasks } = this.props;
        return (
            <div className="card" style={listId === 'completed' ? { backgroundColor: '#B9C7D1' } : null}>
                <h3 id="title" onClick={this.handleEditCard}>{title}</h3>
                <span id="delete-X" onClick={() => this.handleSubmitCardToRemove(id)}>X</span>
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