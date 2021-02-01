const { Usuario , Acesso , Evento } = require('../models');
const { google } = require('googleapis');
const _ = require('lodash');
require('dotenv').config()

const oauth2Client = new google.auth.OAuth2(process.env.REACT_APP_CLIENT_ID, process.env.CLIENT_SECRET, `postmessage`);

async function verifyToken(token) {
  try {
    const ticket = await oauth2Client.verifyIdToken({
      idToken: token,
      audience: process.env.REACT_APP_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    //second verification of token
    if (
      payload.aud !== process.env.REACT_APP_CLIENT_ID ||
      (payload.iss !== 'accounts.google.com' && payload.iss !== 'https://accounts.google.com')
    ) {
      throw 'Token is not from client or issued by Google';
    }

    return payload;
  } catch (err) {
    console.error(err);
  }
}
module.exports = {
    index: async (req,res) => {
        let usuarios = await Usuario.findAll();
        return res.json(usuarios);
    },
    create: async (req,res)=>{
        let usuario = await Usuario.create(
            {
                nome:req.body.nome,
                email:req.body.email,
                sub:req.body.sub,
                logo:req.body.logo,
                url:req.body.url,
                premium:req.body.premium,
                timezone: req.body.timezone,   
                nomedeexibicao: req.body.nomedeexibicao           
            }).then(response => {
                return res.status(200).json(response);
              })
              .catch(error => {
                return res.status(500).json(error);
              });
            console.log(req.body)
        },

        login: async (req, res) => {
            try {
              let payload;
              let oauthResp;
              //req body is code or id_token
              if (req.body.code) {
                 
                oauthResp = await oauth2Client.getToken(req.body.code);
                payload = await verifyToken(oauthResp.tokens.id_token);

               
              } else {
                // console.log('token', req.body.token);
                payload = await verifyToken(req.body.token);
          
              }
          
              //creates an obj composed of another obj properties
              const user2 = _.pick(payload, ['email', 'sub', '  name']);  //const _ = require('lodash'); nao sei 
         
              const user = {
              sub: payload.sub,
              email: payload.email,          
              nome: payload.name,
              premium: "1"
        
                   }

              //Checks if user exists in database   sub: user.sub
              const userExists = await Usuario.findOne({
                where: {
                  sub: user.sub
                }
              });
               // console.log(userExists)
              if (userExists) {
                //update tokens for registered users on signup path
                if (req.body.code) {

            
                  userExists.access_token = oauthResp.tokens.access_token;
                  userExists.refresh_token = oauthResp.tokens.refresh_token;
                  await userExists.save();
                }
                //implement sessions later
               // req.session.userID = user.sub;  <<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>
                return res.status(200).end();
              }
          
              //Implied VALIDATION via Google
              const newUser = await new Usuario({
                sub: payload.sub,
                email: payload.email,          
                nome: payload.name
          
                     }).save() 
                  console.log(newUser.dataValues)
                     console.log(newUser.dataValues.id)
                    
                           

              // Usuario.create(
              //   {
              //       nome:payload.sub,
              //       email:payload.email,
              //       sub:payload.name
              
                   
              //   }).then(response => {
              //     console.log(response)
              //     })
              //     .catch(error => {
              //      console.log(error)
              //     });
             
              //add default 60min meeting
             // newUser.meetings = [{ meetingName: '60 minute meeting', duration: 60 }];
              //add tokens
              newUser.access_token = oauthResp.tokens.access_token;
              newUser.refresh_token = oauthResp.tokens.refresh_token;
              newUser.subscriber = false;
          
              try {
           
                const acessotok = await new Acesso({
                  accessToken: oauthResp.tokens.access_token,
                  refreshToken: oauthResp.tokens.refresh_token,          
                  usuarios_id: newUser.dataValues.id
            
                       }).save()
                //implement sessions later
               // req.session.userID = user.sub;  <<<<<<<<<<<<<<<vreficar como fuciona as sessis>>>>>>>>>>>>>
                res.status(201).send(newUser);
              } catch (err) {
                console.error(err);
                res.status(500).send(err);
              }
            } catch (err) {
              console.error(err);
              res.status(500).send(err);
            }
          },

         isUnique:  (req, res) => {
          Usuario.findOne({ where:{ url: req.query.url }})
              .then((user) => {

                console.log(user)
                if (!user) {
                  res.status(200).json({ isUnique: true });
                } else {
                  res.status(200).json({ isUnique: false });
                }
              })
              .catch((err) => res.status(500).send('Server Error:' + err));
          },
          createvento: async (req, res) => {
            const sub = req.params.id;
          console.log(req.body)
            try {
              const usuario = await Usuario.findOne({
                where: {
                  sub: sub
                }
              });
                Evento.create({
                  usuarios_id : usuario.dataValues.id,
                  nomeEvento : "60",
                  duracao : 60,
                  exibicao : 60,
                  url : "60",
                  timezone : req.body.timeZone,
                  descricao : "Agendamento de 60 minutos",
                })
                usuario.timezone = req.body.timeZone
                usuario.url = req.body.url
                usuario.save()
                   
              res.status(200).send('User profile updated');
            } catch (err) {
              console.error(err);
              res.status(400).send(err);
            }
          },
          getUser: async (req, res) => {
            const sub = req.params.id;
          
            try {

              const user = await Usuario.findOne({ where:{ sub: sub }});
           console.log(user)
              const meetings = []
             // const evento = await Evento.findAll({ where:{ usuarios_id: user.dataValues.id }});
              const evento = await Evento.findAll({ where:{ usuarios_id: [user.dataValues.id] }});
             
              evento.forEach(element => {
                console.log(element.dataValues)
                meetings.push(   element.dataValues)
              });
          const dados = {
            id: user.dataValues.id,
            nome: user.dataValues.nome,
            email: user.dataValues.email,
            sub: user.dataValues.sub,
            logo: user.dataValues.logo,
            url: user.dataValues.url,
            premium: user.dataValues.premium,
            timezone: user.dataValues.timezone,
            nomedeexibicao: user.dataValues.nomedeexibicao,
            meetings:meetings

          }
           console.table(dados)
              res.status(200).json(dados);
            } catch (err) {
              console.error(err);
              res.status(400).send(err);
            }
          },
          getUserByUrl: async (req, res) => {
            const userUrl = req.params.url;
          
            try {
             
              const user = await Usuario.findOne({ where:{ url: userUrl } ,include:['evento','acesso']})
              res.status(200).json(user);
            } catch (err) {
              console.error(err);
              res.status(400).send(err);
            }
          }


}
