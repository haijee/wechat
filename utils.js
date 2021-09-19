
const fs = require('fs')
const sha1 = require('sha1');
const https = require('https');
const config  = require('./config')

function getUrl(){
    return `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.appid}&secret=${config.appsecret}`
}

function  requestToken () {
    return new Promise((resolve,reject)=>{
        https.get(getUrl(), (response) => {
            let todo = '';
            // called when a data chunk is received.
            response.on('data', (chunk) => {
            todo += chunk;
            });
        
            // called when the complete response is received.
            response.on('end', () => {
            resolve(JSON.parse(todo))
            });
        
        }).on("error", (error) => {
            console.log("Error: " + error.message);
            reject()
        });
    })
}

function readToken(){
    return new Promise((resolve,reject)=>{
        fs.readFile('token.json', (error,data) => {
            if (error) {
                reject()
            }else {
                const token  = JSON.parse( data.toString())
                const currenttime = Math.floor(Date.now()/1000)
                if(token.expires_time + 7200 > currenttime && token.access_token){
                    resolve(token)
                }else{
                    reject()
                }
            }
        }) 
    })
}


function writeToken(json){
    json.expires_time = Math.floor(Date.now()/1000)
    return new Promise((resolve,reject)=>{
        fs.writeFile('token.json', JSON.stringify(json), error => {
            if (error) {
                console.log("文件写入失败！", error)
                reject()
            }else {
                console.log('文件写入成功！',error)
                resolve(true)
            }
        }) 
    })
}

async function requestTicket(token){
    const url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${token}&type=jsapi`
        return new Promise((resolve,reject)=>{
            https.get(url, (response) => {
                let todo = '';
                // called when a data chunk is received.
                response.on('data', (chunk) => {
                todo += chunk;
                });
            
                // called when the complete response is received.
                response.on('end', () => {
                resolve(JSON.parse(todo))
                });
            
            }).on("error", (error) => {
                console.log("Error: " + error.message);
                reject()
            });
        })

}

function readTicket(){
    return new Promise((resolve,reject)=>{
        fs.readFile('ticket.json', (error,data) => {
            if (error) {
                reject()
            }else {
                const ticket  = JSON.parse( data.toString())
                const currenttime = Math.floor(Date.now()/1000)
                if(ticket.expires_time + 7200 > currenttime && ticket.ticket){
                    resolve(ticket)
                }else{
                    reject()
                }
            }
        }) 
    })
}
function writeTicket(json){
    json.expires_time = Math.floor(Date.now()/1000)
    return new Promise((resolve,reject)=>{
        fs.writeFile('ticket.json', JSON.stringify(json), error => {
            if (error) {
                console.log("文件写入失败！", error)
                reject()
            }else {
                console.log('文件写入成功！',error)
                resolve(true)
            }
        }) 
    })
}


async function  getToken(){
    try {
        const result = await readToken()
        return result.access_token
    } catch (error) {
        const result = await requestToken()
        const token = await writeToken(result)
        return result.access_token
    } 
}

async function  getTicket(){
    try {
        const result = await readTicket()
        return result.ticket
    } catch (error) {
        const token = await getToken()
        const ticket = await requestTicket(token)
        const w = await writeTicket(ticket)
        return ticket.ticket
    } 
}



function randomString(e) {  
    e = e || 32;
    var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
    a = t.length,
    n = "";
    for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n
}

module.exports = async function getSignature(url){
    const jsapi_ticket =  await getTicket()
    const noncestr = randomString(10)
    const timestamp = Math.floor(Date.now()/1000)
    const str = `jsapi_ticket=${jsapi_ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`;
    const signature =  sha1(str)
    return {
        appId:config.appid,
        timestamp,
        noncestr,
        signature,
        url
    }
}
