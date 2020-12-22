import React, { Fragment, useState, useEffect } from 'react';

const ListTodos = () => {
    const [todos, setTodos] = useState([]);

    async function getTodos() {
        const res = await fetch('http://localhost:5000/todos');

        const todoArray = await res.json();
        
        setTodos(todoArray);
    }
    
    useEffect(() => {
        getTodos();
    }, []);

    return (
        <Fragment>
            <table className='table mt-5'>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todos.map(todo => (
                            <tr>
                                <td>{todo.description}</td>
                                <td>Edit</td>
                                <td>Delete</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListTodos;