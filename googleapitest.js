const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');
const fs = require('fs');
// Imports the Google Cloud client library
const Vision = require('@google-cloud/vision');

const app = express();


// Instantiates a client
const vision = Vision();

// The path to the local image file, e.g. "/path/to/image.png"
// const fileName = '/path/to/image.png';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

let testImageUrl = path.join(__dirname, '/public/IMG_2448.jpg');

//console.log(testImageUrl);

app.get('/', (req, res) => {
    console.log("I'm in get req.");

    fs.readFile(testImageUrl, (err, imgFile) => {
        if (err) console.error(err);
        else {
            let imgBase64 = new Buffer(imgFile).toString('base64');

            vision.faceDetection({content : imgBase64}).then((results) => {
                console.log("I got the results with base 64 img! !!!!!!");
                const faces = results[0].faceAnnotations;

                console.log('Faces:');
                faces.forEach((face, i) => {
                    console.log(`  Face #${i + 1}:`);
                    console.log(`    Joy: ${face.joyLikelihood}`);
                    console.log(`    Anger: ${face.angerLikelihood}`);
                    console.log(`    Sorrow: ${face.sorrowLikelihood}`);
                    console.log(`    Surprise: ${face.surpriseLikelihood}`);
                });

                res.json({success : true, images : faces});

            }).catch((err) => {
                console.error("ERROR : ", err);
            });
        }
    });

    // // 이게 source가 아니라 content면 데이터는 buffer가 되어야 한다.
    // vision.faceDetection({ source: { filename: testImageUrl } })
    //     .then((results) => {
    //         console.log("I got the results!");
    //         const faces = results[0].faceAnnotations;
    //
    //         console.log('Faces:');
    //         faces.forEach((face, i) => {
    //             console.log(`  Face #${i + 1}:`);
    //             console.log(`    Joy: ${face.joyLikelihood}`);
    //             console.log(`    Anger: ${face.angerLikelihood}`);
    //             console.log(`    Sorrow: ${face.sorrowLikelihood}`);
    //             console.log(`    Surprise: ${face.surpriseLikelihood}`);
    //         });
    //
    //         res.json({success : true, images : faces});
    //     })
    //     .catch((err) => {
    //         console.error('ERROR:', err);
    //     });

    // fs.readFile(testImageUrl, (err, imgFile) => {
    //     if (err) console.error(err);
    //     else {
    //         let base64 = new Buffer(imgFile).toString('base64');
    //
    //         let headers = {
    //             'Content-Type' : 'application/json',
    //             'authorization' : 'AIzaSyD6IBV_sUHO5WZ8bAURkV-TKNj9aDSjtNo'
    //         };
    //
    //         let formData = {
    //             image : ""
    //         }
    //
    //         let options = {
    //             url : 'https://vision.googleapis.com/v1/images:annotate',
    //             headers : headers,
    //             json : true,
    //             body : formData
    //         };
    //
    //
    //
    //
    //
    //         res.send(`<h1>Hi</h1>`);
    //     }
    // })
});

app.listen(3000, () => {
    console.log('graduation project test is listening on port ... 3000');
});







