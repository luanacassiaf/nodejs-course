var pdf = require('html-pdf')
const PDF = require('html-pdf/lib/pdf')

class PDFWriter {
    static WritePDF(filename, html) {
        pdf.create(html, {}).toFile(filename, (err) => {})
    }
}

module.exports = PDFWriter