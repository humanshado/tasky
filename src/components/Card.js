import React, { Component } from 'react';
import Tasks from './Tasks';


class Card extends Component {

    handleEdit = (e) => {
        //console.log('target in handleEdit in card ', e.target);   
        let { id } = this.props;
        this.props.toggleEditCard(id, e.target);
        
    }

    handleSubmitCardToRemove = (id) => {
        this.props.submitRemoveCard(id);
    }
    
    render () {
        console.log('props in card ', this.props);
        const { id, title, description, listId, tasks } = this.props;
        return (
            <div className="card" style={listId === 'completed' ? { backgroundColor: '#B9C7D1' } : null}>
                <h3 id="title" onClick={this.handleEdit}>{title}</h3>
                <span id="delete-X" onClick={() => this.handleSubmitCardToRemove(id)}>X</span>
                <hr />
                <div className="card-details">
                    <p id="description" onClick={this.handleEdit}>{description}</p>
                <Tasks
                    listId={listId}
                    cardId={id}
                    tasks={tasks || []} />
                </div>
                    <hr />
                <p>Card Move Options ...</p> 
            </div>
        )
    }
}

export default Card;