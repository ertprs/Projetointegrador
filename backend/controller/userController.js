const { Usuario } = require('../models');

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
        }


}