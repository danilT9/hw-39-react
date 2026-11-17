import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Routes } from 'react-router-dom';
import { Book } from './comps/Book';
import { Form } from './comps/Form';
import { Login } from './comps/Login';
import { Search } from './comps/Search';
import { SignUp } from './comps/SignUp';
import { PrivateRoute } from './comps/PrivateRoute';
import { RestrictedRoute } from './comps/RestrictedRoute';
import { fetchAll, logOut, setAuthHeader } from './redux/operations';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    if (token) {
      setAuthHeader(token);
    }
  }, [token]);
  
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchAll());
    }
  }, [dispatch, isLoggedIn]);

  const handleLogout = () => {
    dispatch(logOut());
  };
  
  return (
    <>
      <nav style={{ display: 'flex', gap: '15px', padding: '10px', background: '#f0f0f0' }}>
        {isLoggedIn ? (
          <>
            <Link to="/">Contacts</Link>
            <button onClick={handleLogout} style={{ marginLeft: 'auto' }}>Log Out</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </nav>

      <Routes>
        <Route path='/' element={
          <PrivateRoute>
            <main>
              <h1>Phonebook</h1>
              <Form />
              <h2>Contacts</h2>
              <Search />
              <Book />
            </main>
          </PrivateRoute>
        } />
        
        <Route path='/signup' element={
          <RestrictedRoute redirectTo="/">
            <SignUp />
          </RestrictedRoute>
        } />
        
        <Route path='/login' element={
          <RestrictedRoute redirectTo="/">
            <Login />
          </RestrictedRoute>
        } />
      </Routes>
    </>
  );
}

export default App;