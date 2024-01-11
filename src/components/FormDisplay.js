import React, {  useContext, useState } from 'react';
import GlobaleContext from '../context/CreateContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const DynamicForm = () => {
    const {state} = useContext(GlobaleContext);
    const formFields = state.formData
  const [formValues, setFormValues] = useState({});
    const {dispatch} = useContext(GlobaleContext);

  const validationSchema = Yup.object().shape({
    ...formFields.reduce((acc, field, index) => {
      const fieldName = `field_${index}`;
      if (field.required) {
        acc[fieldName] = Yup.string().required(`${field.label} is required`);
      } else {
        acc[fieldName] = Yup.string();
      }
      return acc;
    }, {}),
  });

  const formik = useFormik({
    initialValues: {},
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission
        dispatch({type: 'submit_form', payload: values})
    },
    
  });

  const handleInputChange = (fieldName, value) => {
    setFormValues({ ...formValues, [fieldName]: value });
    formik.handleChange(fieldName)(value);
  };

  const renderFormFields = () => {
    return formFields && formFields.map((field, index) => {
      const { label, type, options } = field;
      const fieldName = `field_${index}`;

      switch (type) {
        case 'text':
            return (
                <div key={fieldName} className='input_group'>
                  <label>{label}:</label>
                  <input
                    type={type}
                    name={fieldName}
                    value={formik.values[fieldName] || ''}
                    onChange={(e) => handleInputChange(fieldName, e.target.value)}
                  />
                  
                  {formik.errors[fieldName] && (
            <span style={{ color: 'red' }}>{formik.errors[fieldName]}</span>
          )}
                </div>
                
              );

              case 'number':
                return (
                    <div key={fieldName} className='input_group'>
                      <label>{label}:</label>
                      <input
                        type={type}
                        name={fieldName}
                        value={formik.values[fieldName] || ''}
                        onChange={(e) => handleInputChange(fieldName, e.target.value)}
                      />
                      { formik.errors[fieldName] && (
                    <span style={{ color: 'red' }}>{formik.errors[fieldName]}</span>
          )}
                    </div>
                  );

                  case 'email':
                    return (
                        <div key={fieldName} className='input_group'>
                          <label>{label}:</label>
                          <input
                            type={type}
                            name={fieldName}
                            value={formik.values[fieldName] || ''}
                            onChange={(e) => handleInputChange(fieldName, e.target.value)}
                          />
                          {console.log(formik.errors[fieldName])}
                          { formik.errors[fieldName] && (
                <span style={{ color: 'red' }}>{formik.errors[fieldName]}</span>
              )}
                        </div>
                      );
    
        case 'textarea':
          return (
            <div key={fieldName} className='input_group'>
              <label>{label}:</label>
              <textarea
                rows="4" 
                cols="50"
                type={type}
                name={fieldName}
                value={formik.values[fieldName] || ''}
                onChange={(e) => handleInputChange(fieldName, e.target.value)}
              />
              {formik.errors[fieldName] && (
            <span style={{ color: 'red' }}>{formik.errors[fieldName]}</span>
          )}
            </div>
          );

        case 'dropdown':
          return (
            <div key={fieldName} className='input_group'>
              <label>{label}:</label>
              <select
                name={fieldName}
                value={formik.values[fieldName] || ''}
                onChange={(e) => handleInputChange(fieldName, e.target.value)}
              >
                {options.map((option, i) => (
                  <option key={i} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              { formik.errors[fieldName] && (
            <span style={{ color: 'red' }}>{formik.errors[fieldName]}</span>
          )}
            </div>
          );

        case 'checkbox':
          return (
            <div key={fieldName} className='input_group'>
              <label>
                <input
                  type="checkbox"
                  name={fieldName}
                  checked={formik.values[fieldName] || ''}
                  onChange={(e) => handleInputChange(fieldName, e.target.value)}
                />
                {label}
              </label>
              { formik.errors[fieldName] && (
            <span style={{ color: 'red' }}>{formik.errors[fieldName]}</span>
          )}
            </div>
          );

        case 'radio':
          return (
            <div key={fieldName} className='input_group'>
              <label>{label} : </label>
              {options.map((option, i) => (
                <label key={i}>
                  <input
                    type="radio"
                    name={fieldName}
                    value={option}
                    checked={formik.values[fieldName] === option}
                    onChange={(e) => handleInputChange(fieldName, e.target.value)}
                  />
                  {option}
                </label>
                
              ))}
              { formik.errors[fieldName] && (
            <span style={{ color: 'red' }}>{formik.errors[fieldName]}</span>
          )}
            </div>
          );

          case 'file':
        return (
          <div key={fieldName} className='input_group'>
            <label>{label}:</label>
            <input
              type="file"
              name={fieldName}
              accept={options.map((option, i) => `image/${option}`)}
              onChange={(e) => handleFileInputChange(fieldName, e.target.files)}
            />
            {formik.errors[fieldName] && (
            <span style={{ color: 'red' }}>{formik.errors[fieldName]}</span>
          )}
          </div>
        );


        default:
          return null;
      }
    });
  };

  const handleFileInputChange = (fieldName, files) => { 
  setFormValues((prevValues) => ({
    ...prevValues,
    [fieldName]: files[0],
  }));
  formik.setFieldValue(fieldName, files[0]);
  };

  return (
    <div className='form_display'>
      <h2>Your Generated Form</h2>
      <form onSubmit={formik.handleSubmit}>
        {renderFormFields()}
        <button className='submit_btn display' type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DynamicForm;
