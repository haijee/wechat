let { test, app, toJson, toXml } = require("./dist/index")

console.log("XmJson", toJson("aa"))
console.log("XmJson", toXml("bb"))

 let ACCESS_TOKEN = "33_B71x8FXPqDtjYcSfozQ79GEdDuo4Ur-8GLP91056BXz8WngB3X3XriJInNTcBox187EcUKTldtndXGFR_Hp6-hVAPsuowlEwt4Mm9wjB5InfFmgoSPXaD_87sKuuruCLCKKNHvUKqDhqgMcSPJSjABACWF"

 https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx31bea5f7647b6597&secret=cfa26d3e3681d11aaa630c14fb4cda21

https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=33_B71x8FXPqDtjYcSfozQ79GEdDuo4Ur-8GLP91056BXz8WngB3X3XriJInNTcBox187EcUKTldtndXGFR_Hp6-hVAPsuowlEwt4Mm9wjB5InfFmgoSPXaD_87sKuuruCLCKKNHvUKqDhqgMcSPJSjABACWF