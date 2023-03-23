const mongoose = require("mongoose");
mongoose.connect(
    "mongodb+srv://muneesh:muneesh15@Cluster0.ishfmj2.mongodb.net/mydb",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

const express = require("express");
const Device = require("./models/device");
const app = express();
const bodyParser = require("body-parser");
const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(express.static(`${__dirname}/public/generated-docs`));

app.get('/docs', (req, res) => {
  res.sendFile(`${__dirname}/public/generated-docs/index.html`);
});

app.get("/api/test", (req, res) => {
    res.send("The API is working!");
});


 /**
* @api {get} /api/devices AllDevices An array of all devices
* @apiGroup Device
* @apiSuccessExample {json} Success-Response:
*  [
*    {
*      "_id": "dsohsdohsdofhsofhosfhsofh",
*      "name": "Mary's iPhone",
*      "user": "mary",
*      "sensorData": [
*        {
*          "ts": "1529542230",
*          "temp": 12,
*          "loc": {
*            "lat": -37.84674,
*            "lon": 145.115113
*          }
*        },
*        {
*          "ts": "1529572230",
*          "temp": 17,
*          "loc": {
*            "lat": -37.850026,
*            "lon": 145.117683
*          }
*        }
*      ]
*    }
*  ]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/

// app.get("/api/devices", (req, res) => {
//     Device.find({}, (err, devices) => {
//         if (err == true) {
//             return res.send(err);
//         } else {
//             return res.send(devices);
//         }
//     });
// });

app.get("/api/devices", async (req, res) => {
    try {
     const devicess = await Device.find({});
     res.json(devicess)
    } catch (err) {
         res.send(err);
    }
 })

app.post("/api/devices", async (req, res) => {
    const { name, user, sensorData } = req.body;
    const newDevice = new Device({
        name,
        user,
        sensorData,
    });
    try {
        const newDev = newDevice.save();
        res.send("successfully added device and data");        
    } catch (err) {
        res.send(err);
    }
});


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
