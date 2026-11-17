import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../redux/operations';
import { selectContacts, selectIsLoading } from '../redux/selectors';

export const Form = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const [form, setForm] = useState({ name: '', number: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contactName = form.name.trim();
    const contactNumber = form.number.trim();

    if (!contactName || !contactNumber) {
      return;
    }
    if (contacts.some(contact => contact.number.toLowerCase() === contactNumber.toLowerCase())) {
      return;
    }

    try {
      await dispatch(addContact({ name: contactName, number: contactNumber })).unwrap();
      setForm({ name: '', number: '' });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <input type="tel" name="number" value={form.number} onChange={handleChange} placeholder="Phone number" />
      <button type="submit" disabled={isLoading}>Add</button>
    </form>
  );
};