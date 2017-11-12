import React from 'react';

const Alert = (props) => (
  <div className="alert alert-danger alert-dismissible fade show" role="alert">
    {props.msg}
  </div>
)

export default Alert;