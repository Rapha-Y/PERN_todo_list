import React, { Fragment, useState, useEffect } from 'react';
import EditTodo from './EditTodo';

const ListTodos = () => {
    const [todos, setTodos] = useState([]);

    async function deleteTodo(id) {
        try {
            await fetch(
                `http://localhost:5000/todos/${id}`,
                {
                    method: 'DELETE'
                }
            );

            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (error) {
            console.log(error.message);
        }
    }

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
                            <tr key={todo.todo_id}>
                                <td>{todo.description}</td>
                                <td>
                                    <EditTodo todo={todo} />
                                </td>
                                <td>
                                    <button 
                                        className='btn btn-danger' 
                                        onClick={() => deleteTodo(todo.todo_id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListTodos;