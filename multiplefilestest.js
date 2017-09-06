const fs = require('fs');
const path = require('path');
const Faced = require('faced');
let faced = new Faced();

fs.readdir(__dirname, (err, filenames) => {
    if (err) {
        console.log(err);
    } else {
        filenames.forEach((filename) => { // for each이면 각각 이미지마다 face identify 할 수 있으므로
            // 이것도 테스트해봐야 한다.
            let re = new RegExp(/[A-Za-z0-9_-]*(.txt)/);
            //let imgReg = new RegExp(/(camera)[0-9]*(.JPG)|(.jpg)/);
            let imgReg = new RegExp(/(.JPG)|(.jpg)/);
            if (filename.match(re)) {
                console.log("This matched txt.\n");
            } else if (filename.match(imgReg)) {

                // not working.
                // faced.detect(filename, function (faces, image, file) {
                //     console.log("This one is image.\n", filename);
                //
                //     if (!faces) {
                //         return console.log("No faces found!");
                //     }
                //
                //     var face = faces[0];
                //
                //     console.log(
                //         "Found a face at %d,%d with dimensions %dx%d",
                //         face.getX(),
                //         face.getY(),
                //         face.getWidth(),
                //         face.getHeight()
                //     );
                //
                //     console.log(
                //         "What a pretty face, it %s a mouth, it %s a nose, it % a left eye and it %s a right eye!",
                //         face.getMouth() ? "has" : "does not have",
                //         face.getNose() ? "has" : "does not have",
                //         face.getEyeLeft() ? "has" : "does not have",
                //         face.getEyeRight() ? "has" : "does not have"
                //     );
                // });


            }

            //console.log(filename);
        });
    }
});