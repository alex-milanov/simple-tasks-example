'use strict';

// lib
const path = require('path');

// dependencies
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

// rest api
const restApi = require('iblokz-rest-api');
const restMap = require('./rest.json');

// create app and db instances
const app = express();
const db = mongoose.connect('mongodb://localhost/project-name');

// express prefs
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.resolve(__dirname, '../dist')));

// loads the models from json schema
restApi.loadModel(restMap, db);

// initis rest endpoints
restApi.initRoutes(app, restMap, {}, db);

app.listen(8080, () => console.log(`Listening to port 8080`));
