import React, { useContext, useState } from 'react';
import FormField from './FormField';
import GlobaleContext from '../context/CreateContext';

const FormGenerator = ({  formData, onSubmit }) => {
  const [formFields, setFormFields] = useState(formData);
    const {dispatch} = useContext(GlobaleContext);
  const handleAddField = () => {
    setFormFields([...formFields, { label: '', type: 'text', options: [], required: false }]);
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);
    if(updatedFields.length === 0){
      dispatch({type: 'create_form', payload: updatedFields})
    }

  };

  const handleFieldChange = (index, key, value) => {
    const updatedFields = [...formFields];
    updatedFields[index][key] = value;
    setFormFields(updatedFields);
  };

  const handleSubmit = () => {
    const isValid = validateForm();
    if (isValid) {
      onSubmit(formFields);
    } else {
      alert('Please fill out all required fields.');
    }
  };

  const validateForm = () => {
    
    return formFields.every((field) => field.label && field.type);
  };
  return (
    <div className='form_generator'>
       <h2>Create Your Form</h2> 
      {formFields.map((field, index) => (
        <FormField
          key={index}
          index={index}
          field={field}
          onChange={handleFieldChange}
          onRemove={handleRemoveField}
        />
      ))}
      <div className="btn-wrapper">
      <button className='add_field_btn' onClick={handleAddField}>Add Field</button>
      <button className='submit_btn' onClick={handleSubmit}>Submit</button>
      </div>
      
    </div>
  );
};

export default FormGenerator;
