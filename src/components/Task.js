import React from 'react';

const Task = ({ name, done }) => {
    return (
        <div className="task">
            <input type="checkbox" defaultChecked={done} />
            {name}  
        </div>
        )
    }

export default Task;