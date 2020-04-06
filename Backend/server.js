const express = require('express');
const mongoose = require('mongoose');

const app = express();

const connectToDb = async () => {
    try {
        await mongoose.connect('mongodb://localhost/tsa_soccer-app', {useNewUrlParser: true, useUnifiedTopology: true});
    } catch (err) {
        console.log(err);
    }
}
connectToDb().then(() => {
    const api = require('./routes/index');

    app.use('/api/', api);

    const server = app.listen(3000, () => {
        const { address, port } = server.address();
        console.log(`Listening at http://${address}:${port}`);
    })
}).catch((err) => {
    console.log(err);
})