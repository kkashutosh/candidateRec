const express = require("express")
require("./db/connection")
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use('/api', require('./routers/candidate.route'))


app.listen(port, () => {
    console.log(`connection successfully!!`)
})