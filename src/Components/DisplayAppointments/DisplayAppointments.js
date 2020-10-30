import React, { useState, useEffect } from 'react';
import handleFetchErrors from '../../utils/handleFetchErrors';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Tabs, Tab } from '@material-ui/core';
import PropTypes from 'prop-types';
import AppointmentsPanel from './AppointmentsPanel';
import AppointmentList from './AppointmentList';
const data = {
  "upcoming": {
      "10302020": [
          {
              "_id": "5f946474b0532a37ec97dac2",
              "user": "5f6f65fe28000032dc1b6e26",
              "userTz": "Brazil/Acre",
              "guestName": "iago",
              "guestEmail": "alepaduanlima@gmail.com",
              "guestComment": "dsdsds",
              "guestTz": "America/Sao_Paulo",
              "meetingName": "60 minute meeting",
              "meetTime": 60,
              "apptTime": "2020-10-30T12:00:00.000Z",
              "googleId": "eagg737hdaaceqjqds0dt9anp8",
              "__v": 0
          }
      ]
  },
  "past": {
      "10212020": [
          {
              "_id": "5f90789a857c8e1e18ccf42b",
              "user": "5f6f65fe28000032dc1b6e26",
              "userTz": "Brazil/Acre",
              "guestName": "iago",
              "guestEmail": "tes@gmail.com",
              "guestComment": "sss",
              "guestTz": "America/Sao_Paulo",
              "meetingName": "60 minute meeting",
              "meetTime": 60,
              "apptTime": "2020-10-21T12:50:00.000Z",
              "googleId": "lm3j1f67kqobbqr5e23ova0fmg",
              "__v": 0
          }
      ]
  }
}
const styles = (theme) => ({
  paper: {
    width: '100%',
    minHeight: '400px',
    marginTop: '50px',
    marginBottom: '100px',
  },
});

function DisplayAppointments({ classes, timezone, user }) {
  const [value, setValue] = useState(0);
  const [appointments, setAppointments] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    // fetch user's appointment info
    const fetchAppts = async () => {
      setAppointments(data);
          setUpdate(false);
    };
    if (user) fetchAppts();
  }, [timezone, user, update]);

  // useEffect(() => {
  //   // fetch user's appointment info
  //   const fetchAppts = async () => {
  //     await fetch(`/api/appointments/${user}?timezone=${timezone}`)
  //       .then(handleFetchErrors)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setAppointments(data);
  //         setUpdate(false);
  //       })
  //       .catch((e) => {
  //         console.error('Error: ' + e);
  //       });
  //   };
  //   if (user) fetchAppts();
  // }, [timezone, user, update]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderAppts = (appts) => {
    if (appts) {
      return Object.keys(appts).map((key) => (
        <AppointmentList appointments={appts[key]} key={key} setUpdate={setUpdate} />
      ));
    }
  };
  return (
    <Paper elevation={6} className={classes.paper}>
      <div>
        <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary">
          <Tab label="Agendamentos futuros" />
          <Tab label="Agendamentos passados" />
        </Tabs>
        <AppointmentsPanel value={value} index={0}>
          {renderAppts(appointments.upcoming)}
        </AppointmentsPanel>
        <AppointmentsPanel value={value} index={1}>
          {renderAppts(appointments.past)}
        </AppointmentsPanel>
      </div>
    </Paper>
  );
}

DisplayAppointments.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DisplayAppointments);
