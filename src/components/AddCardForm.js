import React, { Component } from 'react';
import Tasks from './Tasks';

class AddCardForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
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
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render () {
        console.log('Props in AddCardForm ', this.props);
        return (
            <div className="add-card-form">
                <form onBlur={this.handleSubmit}>
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