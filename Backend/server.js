const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

const connectToDb = async () => {
    try {
        await mongoose.connect('mongodb://localhost/tsa_soccer_app', {useNewUrlParser: true, useUnifiedTopology: true});
    } catch (err) {
        console.log(err);
    }
}
connectToDb().then(() => {
    const api = require('./routes/index');

    app.use('/api/', api);

    const server = app.listen(process.env.PORT || 3000, process.env.IP, () => {
        const { address, port } = server.address();
        console.log(`Listening at http://${address}:${port}`);
    })
}).catch((err) => {
    console.log(err);
})