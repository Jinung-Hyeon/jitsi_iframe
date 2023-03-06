var moment = require('moment');

require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

console.log(moment().format('YYYY-MM-DD HH:mm:ss'));

const https = require('https');
var path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();


const options = {
    key: fs.readFileSync(__dirname + '/privkey.cer'),
    cert: fs.readFileSync(__dirname + '/fullchain.cer')
}

var admin = require("firebase-admin");

var serviceAccount = require("./react-fcm-e48f7-firebase-adminsdk-fwt6i-768577fd96.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the Firebase Messaging service worker
app.get('/firebase-messaging-sw.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'firebase-messaging-sw.js'));
});

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

app.get('/master', (req, res) => {
    res.sendFile(__dirname + "/master.html");
});

app.get('/client', (req, res) => {
    res.sendFile(__dirname + "/client.html");
});

app.get('/webrtc', (req, res) => {
    res.sendFile(__dirname + "/jitsi.html");
});



const port = 3000;
// const server = app.listen(port, () => {
//     console.log(`server is listening at http://localhost:${port}`);
// });


const httpsServer = https.createServer(options, app).listen(10000, () => {
    console.log(`server is listening at https://www.handsomeung.co.kr:10000`);
});

const SocketIO = require('socket.io');
const io = SocketIO(httpsServer);



// var fcm_client = 'eZ6FiHsi6kIuJNWLaiEBfM:APA91bFqTLf_t2zhuu39WwpcOZUO1lkWm7dITBKcHOaqfZY6HyAlD__1gW9gxHyyPbYLKrVi-usi5Ctch6iXJrVtH5DZjpC4m8uz6_MwPH6kHReUaQVKALRd_W24YStJvExwZoSUJQS_';
var fcm_client = 'frvjHEdq9E5N8TsASPOEwC:APA91bF_hEFEVfdkuUieDRSbpt_dDd39Ep7u2Sdkw90j2-5A6FPl-uZ-CdpwdjJu2v1vuWNHRXImpY_IRvb1tT0CmO8rCTtxI6QgCnCe4_QhlXu17t2oOnJrCeGUx_HmqGYZPw8vMJ2X';
var fcm_firefox = 'c_se2aB1WqDUGegGSOJL_q:APA91bHONmKn31R3-Mi-0m_PdwrCgPAhsQDBc1Bp5PEwj-Zmxeu8Pgtzi-co6KZX9IpBK5ghR5BUtaG86M3tjSg-iq4alOm6hVjNiJsbsVnO9p0Ht9TFk-lt1ICPyeqGHI9RAHvsfNI7';
var fcm_kim = 'fRUAiycyBsvlgzqFR8uRIC:APA91bFnbGq52aJ79H_LCJKqL01TtLp_Rlp5P2T4uhi0b7AQLG1337tlR8BOP3tvE_zqIRDnXQDTFfDOoRNQdKGmMxJHkmy_Zu8ot0MEj7-g8wMYCGihD46-2K8g3lvt66-uqFLaaOce';
var inviteMsg = {
    notification : {
        title : "제목",
        body : '초대'
        // time : new Date()
      },
      data : {
        sendTime : moment().format('YYYY-MM-DD HH:mm:ss')
      },
    //   token: fcm_client
      tokens : [
        // fcm_token2,
        // fcm_target_token,
        // fcm_yeonggwang,
        // fcm_gokseong,
        // fcm_web,
        // fcm_web2
        fcm_client,
        fcm_firefox,
        fcm_kim
    ]
}

var kickMsg = {
    notification : {
        title : "제목",
        body : '나가기'
        // time : new Date()
      },
      data : {
        sendTime : moment().format('YYYY-MM-DD HH:mm:ss')
      },
    //   token: fcm_client
      tokens : [
        // fcm_token2,
        // fcm_target_token,
        // fcm_yeonggwang,
        // fcm_gokseong,
        // fcm_web,
        // fcm_web2
        fcm_client,
        fcm_firefox,
        fcm_kim
      ]
}



// admin.messaging().sendMulticast(fcm_message)
//   .then(function(response) {
//     console.log("보내기성공" + response)
//     console.log(response);
//     // response.responses.forEach(res => {
//     //   console.log(res)
//     // })

//     console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
//   })





io.on('connection', function (socket) {
    //console.log(socket.id);
    socket.on('login', function(data) {
        console.log('Client logged-in:\n name:' + data.name);
    
        // socket에 클라이언트 정보를 저장한다
        socket.name = data.name;
    
        // 접속된 모든 클라이언트에게 메시지를 전송한다
        // io.emit('login', data.name );
    });

    socket.on('invite', function() {
        console.log('invite')
        // admin.messaging().send(inviteMsg)
        //     .then(function(response){
        //         console.log(response);
        //     }).catch(function (err) {
        //         console.log(err);
        //     });
        admin.messaging().sendMulticast(inviteMsg)
        .then(function(response){
            console.log(response);
        }).catch(function (err) {
            console.log(err);
        });
    });

    socket.on('kickAll', function() {
        console.log('kickAll');
        // admin.messaging().send(kickMsg)
        //     .then(function(response) {
        //         console.log(response)
        //     }).catch(function(err) {
        //         console.log(err);
        //     });

        admin.messaging().sendMulticast(kickMsg)
        .then(function(response) {
            console.log(response)
        }).catch(function(err) {
            console.log(err);
        });
    });


    socket.on('disconnect', function() {
    console.log('user disconnected: ' + socket.name);
    });
});

