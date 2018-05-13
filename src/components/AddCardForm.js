import React, { Component } from 'react';
import TasksList from './TasksList';

class AddCardForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            id: this.props.id,
            title: this.props.title,
            description: this.props.description
        }
    }
    
    handleSubmit = () => {
        console.log('submitting...');
        const { id } = this.props;
        let { title, description } = this.state;
        const newData = {
            title,
            description
        }
        if(title && description){
            this.props.updateCard(id, newData);
        }

    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmitFormToRemove = (id) => {
        this.props.submitRemoveCard(id);
    }

    render () {
        console.log('Props in AddCardForm ', this.props);
        const { id } = this.props;
        return (
            <div className="add-card-form">
                <form onBlur={this.handleSubmit}>
                    <span id="delete-c" onClick={() => this.handleSubmitFormToRemove(id)}>
                        <i className="fas fa-trash-alt"></i>
                    </span>
                    <input 
                        type="text" 
                        name="title"
                        className="addtask-form"
                        value={this.state.title}
                        onChange={(e) => this.handleInput(e)}
                        ref={this.props.titleRef}
                        placeholder="title"/>
                    
                    <hr />
                    <textarea 
                        type="text" 
                        name="description"
                        className="addtask-form"
                        value={this.state.description}
                        onChange={(e) => this.handleInput(e)}
                        ref={this.props.descRef}
                        placeholder="description"/>
                    <TasksList
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