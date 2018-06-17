import React, { Component } from 'react';
import { db } from '../base';
import update from 'immutability-helper';
import sortBy from 'sort-by';
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

        this.titleRef = React.createRef();
        this.descRef = React.createRef();
    }

    validateCard = () => {
        let { listId, cards } = this.props;
        let { cardId } = this.state;
        console.log('cards in validateCard', cards);
        console.log('cardId in validateCard', cardId);
        if(listId === "todo"){
                let theCard = cards.filter(c => c.id === cardId);
                if((theCard.title === '') && (theCard.description === '')){
                    alert("Please enter title and description in previous card");
                    this.titleRef.current.focus();
                }else {
                    return true;
                }
            }
            return false;
        }

    submitNewCard = () => {
        console.log('submitting new card to the list ...');
        this.setState({
                editingCard: true
        }, () => { this.props.addCard(); })  
    }

    handleUpdateCard = (id, { title, description}) => {
        db.collection('cards').doc(id).update({ title, description}).then(() => {
            this.setState({
                cardId: id,
                editingCard: false
            }, () => {
                this.props.updateCard(id, title, description);
            })
        })
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

    submitRemoveCard = (id) => {
        console.log('cardId in submitRemoveCard ', id);
        this.props.removeCard(id);
    }

    submitTasks = (cardId, tasks) => {
        console.log('submitting new tasks in CardList ... ');
        console.log('cardId submitting new tasks in CardList ', cardId);
        console.log('new tasks in CardList ', tasks);

        // let currCard = this.props.cards.filter(c => c.id === cardId);
        // let newCard = update(currCard, {
        //     0: { tasks: { $set: newTasks }}
        // })
         this.props.updateTasksList(cardId, tasks);
    }

    render(){
        
        console.log('props in cardlist ', this.props);

        if(this.props.cards){
            this.props.cards.sort(sortBy('timestamp'));
        }

        return (
            <div className="list" style={this.props.listId === 'completed' ? { backgroundColor: '#003459', borderColor: '#7390A4' } : null}>
                <div>
                    <h2 style={this.props.listId === 'completed' ? { color: '#7390A4' } : null}>{this.props.title}</h2>
                    {this.props.cards.map((card) => {
                        return (card.title === '' && card.description === '') || (this.state.editingCard && this.state.cardId === card.id)
                            ? <AddCardForm 
                                id={card.id}
                                title={card.title}
                                description={card.description}
                                tasks={card.tasks}
                                key={card.id}
                                listId={this.props.listId}
                                handleUpdateCard={this.handleUpdateCard}
                                removeCard={this.props.removeCard}
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
                                removeCard={this.props.removeCard}
                                submitTasks={this.submitTasks}
                                updateTasksList={this.updateTasksList}
                            />
                    })}
                </div> 
                <br />
                {this.props.listId === "todo" &&
                    <span id="add-icon" onClick={this.submitNewCard}>
                        <i className="fas fa-plus-circle"></i>
                    </span>
                }
            </div>
        )
    }
}

export default CardList;