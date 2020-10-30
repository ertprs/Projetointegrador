import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import './GoogleButton.css';

function GoogleButton(props) {
  const { type, click } = props;

  return (
    <div id="googleButton" className="buttonContainer" onClick={click}>
      <FaGoogle size={20} />
      <span>{type === 'login' ? 'Login com o Google' : 'Cadastar com a conta Google'}</span>
    </div>
  );
}

export default GoogleButton;
