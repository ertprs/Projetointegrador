

const { Acesso , Agendamento  } = require('../models');
const { google } = require('googleapis');
const calendar = google.calendar('v3');
require('dotenv').config()

const oauth2Client = new google.auth.OAuth2(process.env.REACT_APP_CLIENT_ID, process.env.CLIENT_SECRET, `postmessage`);
oauth2Client.generateAuthUrl({ access_type: 'offline' });

async function getFreebusy(access, refresh, startISO, endISO, url) {
  oauth2Client.setCredentials({
    access_token: access,
    refresh_token: refresh,
  });

  oauth2Client.on('tokens', (tokens) => {
    if (tokens.refresh_token) {
      // store the refresh_token in my database!
      const user = Acesso.findOne({usuarios_id: url });
      user.refreshToken = tokens.refresh_token;
      user.save();
    }
  });
  try {
    const resp = await calendar.freebusy.query({
      auth: oauth2Client,
      resource: {
        items: [{ id: 'primary' }],
        timeMin: startISO,
        timeMax: endISO,
      },
    });
    console.log("resp.data.calendars.primary.busy")
console.log(resp.data.calendars.primary.busy)
    return resp.data.calendars.primary.busy;
  } catch (err) {
    throw ('Error at gcal freebusy', err);
  }
}

async function insertEvent(
  access,
  refresh,
  startISO,
  endISO,
  timeZone,
  meetingName,
  guestEmail,
  guestName,
  guestComment,
  url,
) {
  oauth2Client.setCredentials({
    access_token: access,
    refresh_token: refresh,
  });

  oauth2Client.on('tokens', (tokens) => {
    if (tokens.refresh_token) {
      // store the refresh_token in my database!
      console.log("<<<<<<<<<<<<<<<<user>>>>>>>>>>>>>")
      const user = Acesso.findOne({
        where:{usuarios_id: url }
      });
      console.log("<<<<<<<<<<<<<<<<user>>>>>>>>>>>>>")
      console.log(user)
      user.refreshToken = tokens.refresh_token;
      user.save();
    }
  });

  console.log("sssssssssssssasasdasdf<<<<<<<<<:>")
  const event = {
    summary: meetingName,
    start: {
      dateTime: startISO,
      timeZone: timeZone,
    },
    end: {
      dateTime: endISO,
      timeZone: timeZone,
    },
    attendees: [{ email: guestEmail, displayName: guestName, comment: guestComment }],
    reminders: {
      useDefault: true,
    },
  };
  try {
    const googleEvent = await calendar.events.insert({
      auth: oauth2Client,
      calendarId: 'primary',
      sendUpdates: 'all',
      resource: event,
    });
    return googleEvent.data;
  } catch (err) {
    throw ('Error at gcal insert', err);
  }
}

async function deleteEvent(access, refresh, eventId) {
  oauth2Client.setCredentials({
    access_token: access,
    refresh_token: refresh,
  });

  oauth2Client.on('tokens', (tokens) => {
    if (tokens.refresh_token) {
      // store the refresh_token in my database!
       const user = Acesso.findOne({ where:{ refreshToken: refresh }});
       user.refreshToken = tokens.refresh_token;
       user.save();
    }
  });

  try {
    await calendar.events.delete({
      auth: oauth2Client,
      calendarId: 'primary',
      eventId: eventId,
      sendUpdates: 'all',
    });
    console.log('success');
  } catch (err) {
    throw ('Error at gcal insert', err);
  }
}
module.exports = { getFreebusy, insertEvent, deleteEvent };
