import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => state.contacts.items;
export const selectSearch = state => state.contacts.filter;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectSearch],
  (contacts, search) => {
    const query = search.trim().toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(query)
    );
  }
);
