
const express = require('express');
const bodyparser = require('body-parser')
const cors = require('cors');
const mongoclient = require('mongodb');
const app = express();
const url = "mongodb+srv://dbUser:dbUser@cluster0-8cdcp.mongodb.net/test?retryWrites=true&w=majority"
 
app.use(bodyparser.json());
app.use(cors());



app.get('/:link', function (req, res) {
    mongoclient.connect(url, function (err, client) {
        if (err) throw err;

        const db = client.db('list');
        db.collection('link').findOne({ "shorturl":parseInt (req.params.link) }).then(function (data) {
            // // console.log(data);
            //  console.log(typeof data)
            // console.log(req.params.link)
            // console.log(typeof req.params.link)
         
           res.redirect( "https://"+data.longurl)

            client.close();

        })
            .catch(function (err) {

                console.log(err);
            })
    })
});

app.post('/', function (req, res) {
    mongoclient.connect(url, function (err, client) {
        if (err) throw err;
        const db = client.db('list');
        db.collection('link').insertOne(req.body).then(function () {
            client.close();
            res.json({
                message: 'successs'
            }).catch(function () {
                client.close();
                res.json({
                    message: 'not received'
                })
            })
        })
    })
})




app.listen(process.env.PORT, function () {
    console.log("prot is running 3000")
});