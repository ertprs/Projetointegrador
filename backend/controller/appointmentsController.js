
const { Usuario , Agendamento  } = require('../models');
//const { emailUserNewAppt } = require('../utils/emailHelper.js'); mandar emael nao precisa
const { insertEvent, deleteEvent } = require('../utils/gcalHelper.js');
const moment = require('moment-timezone');

const create = async (req, res) => {
  const { guestName, guestEmail, guestComment, guestTz, meetingName, meetTime, apptTime, url } = req.body;
  const endTime = moment(apptTime).add(meetTime, 'm').format();

  try {
   // const user = await User.findOne({ url });
   const userapi = await   Usuario.findOne({where:{url:url},include:['evento','acesso']})
  const user = userapi.toJSON()
  
   console.log(user.evento[0].id)
  //   Usuario.findByPk(7,{include:['evento','acesso']}).then(
  //     evento => {
  //         console.log(evento.toJSON());
  //         sequelize.close();
  //     }
  // )
  
    // const newAppointment = new Appointment({
    //   user: user.id,
    //   userTz: user.timezone,
    //   guestName: guestName,
    //   guestEmail: guestEmail,
    //   guestComment: guestComment,
    //   guestTz: guestTz,
    //   meetingName: meetingName,
    //   meetTime: meetTime,
    //   apptTime: apptTime,
    // });

    console.log("sssssssssssssssssss")
    console.log( user.acesso[0].accessToken)
 //   const eventTime = `${moment(apptTime).tz(user.timezone).format('h:mma - dddd, MMMM Do YYYY')}
 const eventTime = `${moment(apptTime).tz("Brazil/Acre").format('h:mma - dddd, MMMM Do YYYY')}
    (${"Brazil/Acre".replace('_', ' ')} GMT${moment.tz("Brazil/Acre").format('Z')})`;
    try {
      const googleEventData = await insertEvent(
        user.acesso[0].accessToken,
        user.acesso[0].refreshToken,
        apptTime,
        endTime,
        "Brazil/Acre",
        meetingName,
        guestEmail,
        guestName,
        guestComment,
        url,
      );

      const newAppointment = new Agendamento({
        horarioAgendadoInicio: apptTime,
        horaioAgendadoFim: endTime,
        googleID: googleEventData.id,
        clienteNome: guestName,
        clienteEmail: guestEmail,
        clienteTelefone: guestName,
        eventos_id: user.evento[0].id
       
      });
     

      await newAppointment.save();

      // await emailUserNewAppt(
      //   user.email,
      //   user.nome,
      //   guestName,
      //   guestEmail,
      //   guestTz.replace('_', ' '),
      //   guestComment,
      //   meetingName,
      //   eventTime,
      // );

      res.status(201).send('New event created');
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

const cancel = async (req, res) => {
  try {
    // const apt = await Appointment.findOne({ _id: req.params.id });
    // const user = await User.findOne({ _id: apt.user });
    console.log(req.params.id )
    const apt = await Agendamento.findOne({where:{ id: req.params.id },include:['agendamentos_evento']});
    console.log()
    const idusuario = apt.toJSON().agendamentos_evento.usuarios_id
    const userapi = await   Usuario.findByPk(idusuario,{include:['evento','acesso']})
    const user = userapi.toJSON()

    user.acesso[0].accessToken,
    user.acesso[0].refreshToken,

    deleteEvent(user.acesso[0].accessToken, user.acesso[0].refreshToken, apt.toJSON().googleID);
    //remove from google calendar
    apt.destroy();
    res.status(200).send('deleted');
  } catch (err) {
    console.error(err);
  }
};

const userIndex = async (req, res) => {
  try {
    //const resp = await Appointment.find({ user: req.params.user_id });

const userapi = await   Usuario.findByPk(req.params.user_id,{include:['evento','acesso']})
    const user = userapi.toJSON()
    console.log(user.evento[0].id)
    const resp = await Agendamento.findAll({where:{  eventos_id: user.evento[0].id }});
  console.log( resp)
    //sort resp by apptTime
    resp.sort((a, b) => {
      return a.horarioAgendadoInicio - b.horarioAgendadoInicio;
    });
    const parsed = { upcoming: {}, past: {} };
    const curr = moment().tz("Brazil/Acre").format();
    for (const appt of resp) {
      const time = moment(appt.horarioAgendadoInicio);
      if (time.isAfter(curr)) {
        if (parsed.upcoming[time.format('MMDDYYYY')]) {
          parsed.upcoming[time.format('MMDDYYYY')].push(appt);
        } else {
          parsed.upcoming[time.format('MMDDYYYY')] = [appt];
        }
      } else {
        if (parsed.past[time.format('MMDDYYYY')]) {
          parsed.past[time.format('MMDDYYYY')].push(appt);
        } else {
          parsed.past[time.format('MMDDYYYY')] = [appt];
        }
      }
    }
    res.status(200).json(parsed);
  } catch (err) {
    res.status(400).json({ Error: 'User does not exist' });
  }
};

module.exports = { create, userIndex, cancel };