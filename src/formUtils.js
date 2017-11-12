const handleChange = (component, name) => {
    return (event) => { 
      let newChange = {};
      newChange[name] = event.target.value
      component.setState(newChange); 
    };
  };

export { handleChange };