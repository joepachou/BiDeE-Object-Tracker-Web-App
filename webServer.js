/*
    2020 © Copyright (c) BiDaE Technology Inc. 
    Provided under BiDaE SHAREWARE LICENSE-1.0 in the LICENSE.
  
    Project Name:
        BiDae Object Tracker (BOT)

    File Name:
        webServer.js

    File Description:
        BOT UI component

    Version:
        1.0, 20200601

    Abstract:
        BeDIS uses LBeacons to deliver 3D coordinates and textual descriptions of
        their locations to users' devices. Basically, a LBeacon is an inexpensive,
        Bluetooth device. The 3D coordinates and location description of every 
        LBeacon are retrieved from BeDIS (Building/environment Data and Information 
        System) and stored locally during deployment and maintenance times. Once 
        initialized, each LBeacon broadcasts its coordinates and location 
        description to Bluetooth enabled user devices within its coverage area. It 
        also scans Bluetooth low-energy devices that advertise to announced their 
        presence and collect their Mac addresses.

    Authors:
        Tony Yeh, LT1stSoloMID@gmail.com
        Wayne Kang, b05505028@ntu.edu.tw
        Edward Chen, r08921a28@ntu.edu.tw
        Joe Chou, jjoe100892@gmail.com
*/

require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const httpsPort = 443;
const httpPort = process.env.HTTP_PORT;
const path = require('path');
const https = require('https');
const http = require('http');
const session = require('express-session');
const validation = require('./api/middlewares/validation');
const sessionOptions = require('./api/config/session');
const credentials = require('./api/config/credentials');
const compression = require('compression');
const dataRoutes = require('./api/routes/dataRoutes');
const authRoutes = require('./api/routes/dataRoutes/authRoutes');
const UIRoutes = require('./api/routes/UIRoutes');
const APIRoutes = require('./web_server/routes/APIRoutes');
const {
    shouldCompress
} = require('./api/config/compression');


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true,}));
app.use(session(sessionOptions));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(compression({
    filter: shouldCompress
}))


/** Replace with br file if the browser support br encoding */
app.get(/\.(js)$/, (req, res, next) => {
    if (req.header('Accept-Encoding').includes('br')) {
        req.url = req.url + '.br';
        res.set('Content-Encoding', 'br');
    } 
    next();
});   

app.use(express.static(path.join(__dirname,'dist')));


UIRoutes(app);

authRoutes(app);

/** Access control of data retrieving from database by session */
// app.use(validation.authChecker);

/** Data retrieving routes */
dataRoutes(app);

APIRoutes(app);

switch(process.env.ENABLE_HTTP) {
    case "1":
    case 1:
    case true:
        const httpServer = http.createServer(app);

        /** Initiate HTTPS server */
        httpServer.listen(httpPort, () => {
            console.log(`HTTP Server running on PORT ${httpPort}`)
        })

        httpServer.timeout = parseInt(process.env.SERVER_TIMEOUT);
        break;
    default:
        const httpsServer = https.createServer(credentials, app);

        /** Initiate HTTPS server */
        httpsServer.listen(httpsPort, () => {
            console.log(`HTTPS Server running on PORT ${httpsPort}`)
        })

        httpsServer.timeout = parseInt(process.env.SERVER_TIMEOUT);
        break;
}


// const httpsServer = http.createServer(app)

// /** Enable HTTP server */
// httpsServer.listen(httpPort, () => {
//     console.log(`HTTP Server running on PORT ${httpPort}`)
// })

// httpsServer.timeout = parseInt(process.env.SERVER_TIMEOUT);





