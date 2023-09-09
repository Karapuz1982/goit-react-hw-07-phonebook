import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contacts/operation';
import { selectFilteredContacts } from 'redux/contacts/selectors';

import { ListItem, DeleteButton } from './ContactListStyles';

const ContactList = () => {
  const dispatch = useDispatch();

  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <ul>
      {filteredContacts.map(({ id, name, phone }) => (
        <ListItem key={id}>
          <span>
            {name}: {phone}
            <DeleteButton onClick={() => dispatch(deleteContact(id))} type="button">
              Delete
            </DeleteButton>
          </span>
        </ListItem>
      ))}
    </ul>
  );
};

export default ContactList;