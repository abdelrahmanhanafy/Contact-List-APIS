//Node Modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('config');

//Set Up a New App
const app = new express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "10mb" }));

//Import Routes
const contact = require('./Controllers/contacts')(express);
//Routes
app.use('/contacts', contact)
//DbConnect
const dbConnect = async () => {
    try {
        await mongoose.connect(config.get('mongoUrl'), { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
        console.log(`connect to DB at: ${config.get('mongoUrl')}`);
        let port = process.env.PORT || config.get('port');
        app.listen(port, () => { console.log(`Listenong on ${port}!`) });
    }
    catch (error) { console.log(`can't connect to DB, something went wrong`) };
}
dbConnect();

