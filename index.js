const express = require("express");
const fileupload = require("express-fileupload")
const app = express()
const cors = require('cors')
const { PDFDocument, rgb } = require('pdf-lib')
const fs = require('fs');

app.set('port', process.env.PORT || 3000)
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(fileupload({ createParentPath: true }))

app.get('/', (req, res) => {
    res.download('regalo.pdf')
})

app.post('/file', (req, res) => {
    let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let data = fs.readFileSync("pdf/regalo.pdf")
    let pdf = PDFDocument.load(data).then(
        (val) => {
            let pages = val.getPages()
            let datos = req.body.nombre+" "+req.body.apellido
            pages[0].drawText(datos.toUpperCase(),{x:140,y:583, size:12, color:rgb(.1,.3,.1)})
            val.save().then(pdf => {
                fs.writeFileSync("regalo.pdf", pdf)
            })
        })

    res.json({ done: true })

})


app.listen(app.get('port'), () => {
})
