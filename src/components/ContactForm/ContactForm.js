import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contacts/operation';
import { selectContacts } from 'redux/contacts/selectors';
import { Form, InputWrapper, Input, Error, Button } from '../ContactForm/ContactFormStyles';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Required!')
        .matches(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/, {
          message:
            "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
          excludeEmptyString: true,
        }),
      phone: Yup.string()
        .required('Required!')
        .matches(
          /^\+?\d{1,4}[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
          {
            message:
              'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +',
            excludeEmptyString: true,
          }
        ),
    }),
    onSubmit: (values, { resetForm }) => {
      const isDuplicate = contacts.find((contact) => contact.name === values.name);
      if (isDuplicate) return alert(`${values.name} is already in contacts.`);

      dispatch(addContact(values));
      resetForm();
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <InputWrapper>
        <Input
          type="text"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          placeholder="Name"
        />
        {formik.touched.name && formik.errors.name && (
          <Error>{formik.errors.name}</Error>
        )}
      </InputWrapper>
      <InputWrapper>
        <Input
          type="text"
          name="phone"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
          placeholder="Phone Number"
        />
        {formik.touched.phone && formik.errors.phone && (
          <Error>{formik.errors.phone}</Error>
        )}
      </InputWrapper>
      <Button type="submit">Add contact</Button>
    </Form>
  );
};

export default ContactForm;

