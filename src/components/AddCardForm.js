import React, { Component } from 'react';
import Tasks from './Tasks';

class AddCardForm extends Component {

    handleSubmit = () => {
        console.log('submitting...');
    }

    render () {
        return (
            <div className="add-card">
                <form onBlur={this.handleSubmit}>
                    <input 
                        type="text" 
                        name="title" 
                        className="addtask-form"
                        placeholder="title"/>
                    <hr />
                    <input 
                        type="text" 
                        name="description"
                        className="addtask-form"
                        placeholder="description"/>
                    <Tasks
                        listId={this.props.listId}
                        cardId={this.props.id}
                        tasks={this.props.tasks || []} />
                    <hr />
                    <p>Card Move Options ...</p> 
                </form>
            </div>
        )
    }
}

export default AddCardForm;