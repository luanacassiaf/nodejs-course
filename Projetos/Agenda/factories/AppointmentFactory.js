class AppointmentFactory {
    build(simpleAppointment) {
        var day = simpleAppointment.date.getDate() + 1
        var month = simpleAppointment.date.getMonth()
        var year = simpleAppointment.date.getFullYear()
        var hour = Number.parseInt(simpleAppointment.time.split(":")[0])
        var minutes = Number.parseInt(simpleAppointment.time.split(":")[1])

        var startDate = new Date(year, month, day, hour, minutes, 0, 0)
        var endDate = new Date(year, month, day, hour + 1, minutes, 0, 0)

        var appo = {
            id: simpleAppointment._id,
            title: simpleAppointment.name + " - " + simpleAppointment.description,
            email: simpleAppointment.email,
            start: startDate,
            end: endDate,
            notified: simpleAppointment.notified
        }

        return appo
    }
}

module.exports = new AppointmentFactory()