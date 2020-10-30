import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import useStylesDashboard from './stylesDashboard.js';
import { withTheme } from '@material-ui/core/styles';
import { Tabs, Tab, Button, Avatar } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import DashPanel from '../../Components/DashPanel/DashPanel';
import Event from '../../Components/Event/Event';
import handleFetchErrors from '../../utils/handleFetchErrors';
import NewEventDialog from '../../Components/NewEventDialog/NewEventDialog';
import auth from '../../auth';
import DisplayAppointments from '../../Components/DisplayAppointments/DisplayAppointments';
import Upgrade from '../Upgrade/Upgrade';
import Checkout from '../Checkout/Checkout';
const data = {"availability":{"days":{"Sunday":false,"Monday":true,"Tuesday":true,"Wednesday":true,"Thursday":true,"Friday":true,"Saturday":false},"hours":{"start":"09:00","end":"17:00"}},"calendars":[],"_id":"5f9464d4b0532a37ec97dac3","email":"iagolucasn@gmail.com","sub":"108546733731334038301","given_name":"iago","family_name":"lucas nunes","picture":"https://lh5.googleusercontent.com/-iW3eKADTDpc/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucltb__sgw3TzKlaf46mDXOSr2xXmA/s96-c/photo.jpg","meetings":[{"_id":"5f9464d4b0532a37ec97dac4","meetingName":"60 minute meeting","duration":60},{"_id":"5f94655ab0532a37ec97dac5","meetingName":"rrtr","duration":60},{"_id":"5f946560b0532a37ec97dac6","meetingName":"rrtrfff","duration":45}],"access_token":"ya29.a0AfH6SMCdjsnTR3urAUrU0ZW9txtRDL-9NaXi49zSegoEGfrtVIi7D6ip-d09NrRNT704yAKTczAmyIOC289GFAB18hnsG0Heln0cazbGKb9RhemjZazALj6fai39sQBC6qXKye5qWyfWhlhQJWcCnXl8O9FaMazRuts","refresh_token":"1//05Ls2G4Jfqjo6CgYIARAAGAUSNwF-L9IrNjwToC-GCJ3kGfeFPC5w0u-NA0W2MxJ1duzSSVhhlADVPC_DfvvoOjDK_uDnsirekb4","subscriber":true,"__v":2,"timezone":"Brazil/West","url":"iagoteste2"}
function Dashboard() {
  const classes = useStylesDashboard();

  const [user, setUser] = useState({ meetings: [] });
  //Tracks active tab
  const [value, setValue] = useState(0);
  //dialog state
  const [open, setOpen] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //POSSIBLE TODO: find another way to render the new meeting in UI
  function renderNewMeeting(meeting) {
    const userClone = Object.assign({}, user);
    userClone.meetings.push(meeting);
    setUser(userClone);
  }

  useEffect(() => {
    //google sub id
    const subId = auth.getSub();
    setUser(data)
    //fetch user info
    // fetch(`/api/user/${subId}`)
    //   .then(handleFetchErrors)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setUser(data);
    //   })
    //   .catch((e) => {
    //     console.error('Error: ' + e);
    //   });
  }, []);

  return (
    <div className={classes.container}>
      <Navbar picture={user.picture} name={user.given_name} />
      <Switch>
        <Route exact path="/dashboard/user/upgrade">
          <Upgrade user={user} setUser={setUser} />
        </Route>
        <Route exact path="/dashboard/user/upgrade/checkout">
          <Checkout user={user} setUser={setUser} />
        </Route>
        <Route path="/">
          <main className={classes.dashBody}>
            <div className={classes.subHeader}>
              <h1>Projeto integrador</h1>
              <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary">
                <Tab label="Tipo de eventos" />
                <Tab label="Agendamentos" />
              </Tabs>
            </div>
            <DashPanel value={value} index={0}>
              <header className={classes.panelHeader}>
                <div className={classes.profileContainer}>
                  <Avatar src={user.picture} />
                  <div className={classes.profileInfo}>
                    <span>{user.given_name}</span>
                    <span>pi.com.br/{user.url}</span>
                  </div>
                </div>
                {user.subscriber ? (
                  <React.Fragment>
                    <Button onClick={handleClickOpen} className={classes.addEventBtn} size="large" variant="outlined">
                      + Novo evento
                    </Button>
                    <NewEventDialog
                      renderNewMeeting={renderNewMeeting}
                      sub={user.sub}
                      open={open}
                      handleClose={handleClose}
                    />
                  </React.Fragment>
                ) : null}
              </header>
              <section className={classes.events}>
                {user.meetings
                  .filter((meeting) => {
                    if (!user.subscriber) {
                      return meeting.duration === 60;
                    } else {
                      return true;
                    }
                  })
                  .map((meeting, index) => (
                    <Event
                      url={user.url}
                      user={`${user.given_name} ${user.family_name}`}
                      key={index}
                      duration={meeting.duration}
                      meetingName={meeting.meetingName}
                    />
                  ))}
              </section>
              <Button size="large" variant="contained" className={classes.getStartedBtn}>
                "teste"
              </Button>
            </DashPanel>
            <DashPanel value={value} index={1}>
              <section className={classes.events}>
                <DisplayAppointments user={user._id} timezone={user.timezone} />
              </section>
            </DashPanel>
          </main>
        </Route>
      </Switch>
    </div>
  );
}

export default withTheme(Dashboard);
