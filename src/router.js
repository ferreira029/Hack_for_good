const express = require('express');
const generalFunction =  require('./functions/generalFunction');
var diff_match_patch = require('googlediff');

const router = express();

var dmp = new diff_match_patch();

router.get('/', generalFunction.index);
/* router.get('/', (req, res) => {
    var leftHandSideObject = "Bruno";
    var rightHandSideObject = "Bruno";
    var ms_start = (new Date()).getTime();
    var d = dmp.diff_main(leftHandSideObject, rightHandSideObject);
    var ms_end = (new Date()).getTime();
    if (true) {
        dmp.diff_cleanupSemantic(d);
    }
    res.status(200).json(d);
}); */

// Tornar a variável visivel em outros arquivos
module.exports = router;