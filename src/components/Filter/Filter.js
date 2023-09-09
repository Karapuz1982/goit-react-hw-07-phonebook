import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/contacts/contactsSlice';
import { selectFilter } from 'redux/contacts/selectors';
import { Label, Input } from './FilterStyles';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleFilter = ({ target: { value } }) => {
    dispatch(setFilter(value));
  };

  return (
    <Label>
      <p>Find contacts by name</p>
      <Input type="text" value={filter} onChange={handleFilter} />
    </Label>
  );
};

export default Filter;