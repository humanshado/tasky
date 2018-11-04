import React, { Component } from 'react';
import { db } from '../firebase';
//import update from 'immutability-helper';
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

    submitNewCard = () => {
        console.log('submitting new card to the list ...');
        this.setState({
                editingCard: true
        }, () => { this.props.crudOps.addCard(); })
    }

    handleUpdateCard = (id, { title, description}) => {
        db.collection('cards').doc(id).update({ title, description}).then(() => {
            this.setState({
                cardId: id,
                editingCard: false
            }, () => {
                this.props.crudOps.updateCard(id, title, description);
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
        this.props.crudOps.removeCard(id);
    }

    submitTasks = (cardId, tasks) => {
        console.log('new tasks in CardList ', tasks);
         this.props.crudOps.updateTasksList(cardId, tasks);
    }

    render(){

        console.log('props in cardlist ', this.props);

        if(this.props.cards){
            this.props.cards.sort(sortBy('timestamp'));
        }

        return (
            <div className="card-list" style={this.props.listId === 'completed' ? { borderLeft: '1px dashed #7390A4' } : null}>
                <div>
                    <div id='card-list-header'>
                        <h2 style={this.props.listId === 'completed' ? { color: '#7390A4' } : null}>{this.props.title}</h2>
                    </div>
                    <div className='card-list-wrapper'>
                    {this.props.cards.map((card) => {
                        return (card.title === '' && card.description === '') || (this.state.editingCard && this.state.cardId === card.id)
                            ?   <div className='card-list-item'>
                                    <AddCardForm
                                        {...card}
                                        key={card.id}
                                        listId={this.props.listId}
                                        handleUpdateCard={this.handleUpdateCard}
                                        removeCard={this.props.crudOps.removeCard}
                                        titleRef={this.titleRef}
                                        descRef={this.descRef} />
                                </div>

                            :   <div className='card-list-item'>
                                    <Card
                                        {...card}
                                        key={card.id}
                                        listId={this.props.listId}
                                        toggleEditCard={this.toggleEditCard}
                                        removeCard={this.props.crudOps.removeCard}
                                        submitTasks={this.submitTasks} />
                                </div>
                    })}
                    </div>
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