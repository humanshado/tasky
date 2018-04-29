import React, { Component } from 'react';
import base from '../base';
import uuidv4 from 'uuid/v4';
import update from 'immutability-helper';
import Card from './Card';
import AddCardForm from './AddCardForm';


class CardList extends Component {
    constructor (props) {
        super(props)
        
        this.state = {
            cardId: '',
            editingCard: false
        }

        this.submitRemoveCard = this.submitRemoveCard.bind(this);
        this.submitTasks = this.submitTasks.bind(this);

        this.titleRef = React.createRef();
        this.descRef = React.createRef();
    }

    addCard = async () => {
        console.log('Adding new card to the list ...');
        const cardId = await uuidv4();
        base.post(`actions/${cardId}`, {
            data: {
                id: cardId,
                title: '',
                description: '',
                status: 'todo',
                tasks: '',
                timestamp: Date.now()
            }
        }).then(() => {
            console.log('New card added ...');
            this.setState({ 
                cardId,
                editingCard: false
            })
        }).catch(error => console.log(error));
    }

    updateCard = async (cardId, { title, description }) => {
        console.log('Updating card ...');
        base.update(`actions/${cardId}`, {
            data: {
                title,
                description
            }
        }).then(() => {
            console.log('Card updated ...');
            this.setState({ 
                cardId,
                editingCard: false
            })
        }).catch(error => console.log(error));
    }

    toggleEditCard = (id, target) => {
        this.setState({
            cardId: id,
            editingCard: true
        }, () => { 
            if (this.titleRef.current.name === target.id){
                this.titleRef.current.focus(); 
            }else{
                this.descRef.current.focus(); 
            }
        }
    )}

    submitRemoveCard = (cardId) => {
        console.log('cardId in submitRemoveCard ', cardId);
        this.props.removeCard(cardId);
    }

    submitTasks = (cardId, newTasks) => {
        console.log('submitting new tasks in CardList ... ');
        console.log('cardId submitting new tasks in CardList ', cardId);
        console.log('new tasks in CardList ', newTasks);

        let currCard = this.props.cards.filter(c => c.id === cardId);
        let newCard = update(currCard, {
            0: { tasks: { $set: newTasks }}
        })
         console.log('newCard after inserting newTasks..', newCard);
         this.props.updateTasksList(cardId, newCard);
    }

    render() {
        console.log('props in cardlist ', this.props);

        return (
            <div className="list" style={this.props.listId === 'completed' ? { backgroundColor: '#003459', borderColor: '#7390A4' } : null}>
                <div>
                    <h2 style={this.props.listId === 'completed' ? { color: '#7390A4' } : null}>{this.props.title}</h2>
                    {this.props.cards.map((card) => {
                        return (card.title === '' && card.description === '') || (this.state.editingCard && this.state.cardId === card.id)
                            ? <AddCardForm 
                                id={this.state.cardId}
                                title={card.title}
                                description={card.description}
                                tasks={card.tasks}
                                key={card.id}
                                listId={this.props.listId}
                                updateCard={this.updateCard}
                                titleRef={this.titleRef}
                                descRef={this.descRef}/>
                            :<Card 
                                id={card.id}
                                title={card.title}
                                description={card.description}
                                tasks={card.tasks}
                                key={card.id}
                                listId={this.props.listId}
                                toggleEditCard={this.toggleEditCard} 
                                submitRemoveCard={this.submitRemoveCard}
                                submitTasks={this.submitTasks}
                            />
                    })}
                </div> 
                <br />
                {this.props.listId === "todo" &&
                    <span id="add-icon" onClick={() => this.addCard()}>
                        <i className="fas fa-plus-circle"></i>
                    </span>
                }
            </div>
        )
    }
}

export default CardList;