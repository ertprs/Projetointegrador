const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");

async function emailUserNewAppt(
  userEmail,
  userName,
  guestName,
  guestEmail,
  guestTz,
  guestComment,
  meetingName,
  eventTime,
) {
  const msg = {
    to: userEmail,
    from: "iagolucasn@gmail.com",
    templateId: 'd-6125845abb24432b8af269d996fac682',
    dynamic_template_data: {
      name: userName,
      guest: {
        name: guestName,
        email: guestEmail,
        timezone: guestTz,
        comments: guestComment,
      },
      meetingName: meetingName,
      eventTime: eventTime,
    },
  };

  try {
    sgMail.send(msg);
  } catch (err) {
    throw Error(err);
  }
}

module.exports = { emailUserNewAppt };
