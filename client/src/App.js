import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import Register from './components/Register';
import Landing from './components/Landing';
import Dashboard from './components/dashboard/Dashboard';
import './App.css';

toast.configure();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const response = await fetch(
        'http://localhost:5000/auth/is-verify',
        {
          method: 'GET',
          headers: {
            token: localStorage.token
          }
        }
      );

      const parseRes = await response.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    isAuth();
  });

  return (
    <Fragment>
      <Router>
        <div className='container'>
          <Switch>
            <Route 
                exact path='/' 
                render={
                  props => 
                  !isAuthenticated ? 
                  <Landing {...props} /> : 
                  <Redirect to='/dashboard' />
                } 
            />
            <Route 
              exact path='/login' 
              render={
                props => 
                !isAuthenticated ? 
                <Login {...props} setAuth={setAuth} /> : 
                <Redirect to='/dashboard' />
              } 
            />
            <Route 
              exact path='/register' 
              render={
                props => 
                !isAuthenticated ? 
                <Register {...props} setAuth={setAuth} /> :
                <Redirect to='/login' />
              } 
            />
            <Route 
              exact path='/dashboard' 
              render={
                props => 
                isAuthenticated ? 
                <Dashboard {...props} setAuth={setAuth} /> :
                <Redirect to='/login' /> 
              } 
            />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;

/*
Raw Todo app

import React, { Fragment } from 'react';
import InputTodo from './components/InputTodo';
import ListTodos from'./components/ListTodos';
import './App.css';

function App() {
  return (
    <Fragment>
      <div className='container'>
        <InputTodo />
        <ListTodos />
      </div>
    </Fragment>
  );
}

export default App;
*/