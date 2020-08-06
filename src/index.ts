var app = {
    name: 'anyScript',
    version: '1.0.0',
    sayName: function (name: any) {
        console.log(this.name);
    }
};

let XmlJson = require("./XmJson")

module.exports = {
    app,
    test: require("./test"),
    toJson: require("./toJson"),
    toXml: require("./toXml"),

}