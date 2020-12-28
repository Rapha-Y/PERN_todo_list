import React, { Fragment, useState } from 'react';

const InputTodo = ({ setTodosChange }) => {
    const [description, setDescription] = useState('');

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('token', localStorage.token);

            const body = { description };
            await fetch(
                'http://localhost:5000/dashboard/todos',
                {
                    method: 'POST',
                    headers: myHeaders,
                    body: JSON.stringify(body)
                }
            );

            setTodosChange(true);
            setDescription('');
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <Fragment>
            <h1 className='text-center my-5'>Input Todo</h1>
            <form className='d-flex' onSubmit={onSubmitForm}>
                <input 
                    type='text' 
                    placeholder='add todo' 
                    className='form-control' 
                    value={description} 
                    onChange={e => setDescription(e.target.value)}
                />
                <button className='btn btn-success'>Add</button>
            </form>
        </Fragment>
    );
};

export default InputTodo;