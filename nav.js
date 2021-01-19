const request = require("request");
const DomParser = require('dom-parser');

var headers = {
    'Cookie': "hasCookie=true"
};

var fundName = process.argv[2];
var options = {
    url: 'https://codequiz.azurewebsites.net/',
    method: 'get',
    headers: headers
};
if (fundName != undefined) {
    request(options, function (error, response, body) {
        if (!error) {
            var parser = new DomParser();
            var elemetsDom = parser.parseFromString(body)
            var elementsTd = elemetsDom.getElementsByTagName("td")
            console.log(elementsTd[findIndexOfElement(elementsTd, fundName) + findIndexOfElement(elemetsDom.getElementsByTagName("th"), 'Nav')].innerHTML)
        } else {
            console.log(error);
        }
    });    
} else {
    console.log('Please input fundname');
}

function findIndexOfElement(elements, valElement) {
    var indexResult;
    elements.map((element, index) => {
        if (element.innerHTML.trim() == valElement) {
            indexResult = index
        }
    })
    return indexResult;
}
