import React, { useContext, useState } from 'react';
import './App.scss';
import FormGenerator from './components/FormGenerator';
import FormDisplay from './components/FormDisplay';
import GlobaleContext from './context/CreateContext';


const App = () => {
  
  const [formData, setFormData] = useState([]);
  const {  dispatch} = useContext(GlobaleContext);
  
  const handleFormSubmit = (data) => {
    console.log('test', data);
    setFormData(data)
    dispatch({type: 'create_form', payload: data})
  };
  return (
    <div className='app_container'>
      <div className="top_container">
      <FormGenerator  formData={formData} onSubmit={handleFormSubmit} />
      {formData.length > 0 &&  <FormDisplay  />}
      </div>
    </div>
  );
};

export default App;
