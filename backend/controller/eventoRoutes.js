const { Agendamento, Evento} = require('../models');
const dateToday = new Date()

module.exports = {
    past: async (req,res) => {
        let agendamento = await Evento.findAll({
            where:{id_usuario: req.params},
            include:[{
                model: Agendamento,
                as: 'agendamento_evento',
                where:{horaioAgendadoFim:{[Op.lt]:dateToday}}
                }]})
    
        return res.json(agendamento);
        
    },
    upcoming: async (req,res) => {
        let agendamento = await Evento.findAll({
            where:{id_usuario: req.params},
            include:[{
                model: Agendamento,
                as: 'agendamento_evento',
                where:{horaioAgendadoFim:{[Op.gte]:dateToday}}
                }]})
    
        return res.json(agendamento);
        
    },

}