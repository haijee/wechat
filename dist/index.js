"use strict";
var app = {
    name: 'anyScript',
    version: '1.0.0',
    sayName: function (name) {
        console.log(this.name);
    }
};
var XmlJson = require("./XmJson");
module.exports = {
    app: app,
    test: require("./test"),
    toJson: require("./toJson"),
    toXml: require("./toXml"),
};
