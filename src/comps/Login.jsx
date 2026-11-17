import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../redux/operations';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logIn({ email, password }))
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log In</h2>
      <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Log In</button>
    </form>
  );
};