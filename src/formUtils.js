const handleChange = (component, name) => {
    return (event) => component.setState({ [name]: event.target.value }); 
  };

export { handleChange };