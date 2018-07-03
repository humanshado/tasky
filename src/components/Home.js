import React from 'react';
import CardList from './CardList';

const Home = (props) => {
    return (
        <div className="working-page">
            <CardList
                listId="todo"
                title="To Do"
                cards={props.cards.filter(card => card.status === "todo")}
                addCard={props.addCard}
                updateCard={props.updateCard}
                removeCard={props.removeCard}
                updateTasksList={props.updateTasksList} />
            <CardList
                listId="on-going"
                title="On Going"
                cards={props.cards.filter(card => card.status === "on-going")}
                updateCard={props.updateCard}
                removeCard={props.removeCard}
                updateTasksList={props.updateTasksList} />
            <CardList
                listId="completed"
                title="Completed"
                cards={props.cards.filter(card => card.status === "completed")}
                updateCard={props.updateCard}
                removeCard={props.removeCard}
                updateTasksList={props.updateTasksList} />
        </div>
    )
}

export default Home;