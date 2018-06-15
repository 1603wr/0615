var newdata = require('./data');
//console.log(newdata)
var seadata = {
    '/api/json': newdata
}
module.exports = function(url) {
    return seadata[url]
        //console.log(url)
}