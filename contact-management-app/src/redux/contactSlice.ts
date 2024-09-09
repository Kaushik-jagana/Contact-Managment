import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  status: 'Active' | 'Inactive';
}

interface ContactState {
  contacts: Contact[];
}

const initialState: ContactState = {
  contacts: [],
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter(c => c.id !== action.payload);
    },
    editContact: (state, action: PayloadAction<Contact>) => {
      const index = state.contacts.findIndex(c => c.id === action.payload.id);
      if (index >= 0) state.contacts[index] = action.payload;
    },
  },
});

export const { addContact, deleteContact, editContact } = contactSlice.actions;
export default contactSlice.reducer;
