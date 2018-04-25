import React, { Component } from 'react';
import Tasks from './Tasks';


class Card extends Component {

    handleEdit = (e) => {
        e.preventDefault();
        console.dir(e.target);

        let { id } = this.props;
        this.props.toggleEditCard(id, e.target);
        
    }
    
    render () {
        console.log('props in card ', this.props);
        const { id, title, description, listId, tasks } = this.props;
        return (
            <div className="card" style={listId === 'completed' ? { backgroundColor: '#B9C7D1' } : null}>
                <h3 onClick={this.handleEdit}>{title}</h3>
                <hr />
                <div className="card-details">
                    <p onClick={this.handleEdit}>{description}</p>
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