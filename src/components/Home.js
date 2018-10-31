import React from 'react';
import CardList from './CardList';

const Home = (props) => {
    return (
        <div className="working-page">
            <CardList
                listId="todo"
                title="To Do"
                cards={props.cards.filter(card => card.status === "todo")}
                crudOps={props.crudOps}
                 />
            <CardList
                listId="on-going"
                title="On Going"
                cards={props.cards.filter(card => card.status === "on-going")}
                crudOps={props.crudOps}
                 />
            <CardList
                listId="completed"
                title="Completed"
                cards={props.cards.filter(card => card.status === "completed")}
                crudOps={props.crudOps}
                 />
        </div>
    )
}

export default Home;