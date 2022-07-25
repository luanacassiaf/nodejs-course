class Processor {
    static Process(data) {
        var rows = data.split('\r\n')
        var array = []

        rows.forEach(row => {
            var word = row.split(',')
            array.push(word)
        });

        return array
    }
}

module.exports = Processor