import React from 'react';
import { MdDelete } from "react-icons/md";

const FormField = ({ index, field, onChange, onRemove }) => {
  const { label, type, options } = field;

  const handleFieldChange = (key, value) => {
    onChange(index, key, value);
  };

  return (
    <div className='form_field'>
      <label>
        <span style={{ color: 'red' }}>*</span>Label:
        <input
          type="text"
          value={label}
          onChange={(e) => handleFieldChange('label', e.target.value)}
        />
      </label>
      <label>
        Type:
        <select
          value={type}
          onChange={(e) => handleFieldChange('type', e.target.value)}
        >
          <option value="text">Text Input</option>
          <option value="number">Number Input</option>
          <option value="email">Email Input</option>
          <option value="textarea">Text Area</option>
          <option value="dropdown">Dropdown</option>
          <option value="checkbox">Checkbox</option>
          <option value="radio">Radio Button</option>
          <option value="file">File Upload</option>
        </select>
      </label>
      <label>
        Required : 
        <input
                  type="checkbox"
                  value={true}
                  onChange={(e) => handleFieldChange('required', e.target.value)}
                />
      </label>
      {type === 'dropdown' || type === 'radio' ?(
        <div className='options'>
          <label>Options:</label>
          <input
            type="text"
            value={options.join(',')}
            placeholder='Option 1, Option 2, Option 3'
            onChange={(e) =>
              handleFieldChange('options', e.target.value.split(','))
            }
          />
        </div>
      ): null}
      {type === 'file' && (
        <div>
          <label>Types:</label>
          <input
            type="text"
            value={options.join(',')}
            placeholder='png,jpeg,pdf'
            onChange={(e) =>
              handleFieldChange('options', e.target.value.split(','))
            }
          />
        </div>
      )}
      <MdDelete className='delete_icon' onClick={() => onRemove(index)}/>
    </div>
  );
};

export default FormField;
