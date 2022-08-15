const AppointmentModel = require("../models/Appointment")
const mongoose = require("mongoose")
const AppointmentFactory = require("../factories/AppointmentFactory")
const mailer = require("nodemailer")

const Appointment = mongoose.model("Appointment", AppointmentModel)

class AppointmentService {
    async create(name, email, description, cpf, date, time) {
        var newAppo = new Appointment({
            name, 
            email, 
            description, 
            cpf, 
            date, 
            time,
            finished: false,
            notified: false
        })
        try {
            await newAppo.save()
            return true
        } catch(err) {
            console.log(err)
            return false
        }
    }

    async getAll(showFinished) {
        if(showFinished) {
            return await Appointment.find()
        } else {
            var allNotFinished = await Appointment.find({'finished': false})
            var appointments = []

            allNotFinished.forEach(appointment => {
                if(appointment.date != undefined) {
                    appointments.push(AppointmentFactory.build(appointment))
                }
            })

            return appointments
        }
    }

    async getById(id) {
        try {
            var event = Appointment.findOne({'_id': id})
            return event
        } catch(err) {
            console.log(err)
        }
    }

    async finish(id) {
        try {
            await Appointment.findByIdAndUpdate(id, {finished: true})
        } catch(err) {
            console.log(err)
        }
    }

    async search(query) {
        try {
            var result = await Appointment.find().or([{email: query}, {cpf: query}])
            return result
        } catch(err) {
            console.log(err)
            return []
        }
    }

    async sendNotification() {
        var appos = await this.getAll(false)
        console.log(appos)

        var transporter = mailer.createTransport({
            host: 'smtp.mailtrap.io',
            port: 25,
            auth: {
                user: '0a3939ab1774d7',
                pass: '969e9cb6edbaff'
            }
        })

        appos.forEach(async appo => {
            var date = appo.start.getTime()
            // Quantidade de milissegundos em uma hora
            var hour = 1000 * 60 * 60 
            var gap = date-Date.now()

            if(gap <= hour) {
                if(!appo.notified) {
                    await Appointment.findByIdAndUpdate(appo.id, {notified: true})
                    transporter.sendMail({
                        from: "admin@agenda.com",
                        to: appo.email,
                        subject: "Você possui um evento em breve."
                    }).then(() => {
                        console.log("Notificação enviada.")
                    }).catch(err => {
                        console.log(err)
                    })
                }
            }
        })
    }
}

module.exports = new AppointmentService()