import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import PropTypes from 'prop-types';
import stylesOnBoarding from './stylesOnBoarding';
import OnBoardButton from './OnBoardButton';

function ConnectedPage({ btnText, handleConfirmSubmit, classes, email }) {
  return (
    <div className={classes.connectedPage}>
      <h3>
        Veja como o CalendApp irá usar o <span>{email}</span>:
      </h3>
      <Divider />
      <div>
        1. Irá verificar "<span>{email}</span>" por conflitos
      </div>
      <Divider />
      <div>
        2. Adicionará eveto ao "<span>{email}</span>"
      </div>
      <Divider />
      <OnBoardButton text={btnText} submitForm={handleConfirmSubmit} />
    </div>
  );
}

ConnectedPage.propTypes = {
  classes: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
  handleConfirmSubmit: PropTypes.func.isRequired,
};

export default withStyles(stylesOnBoarding)(ConnectedPage);
