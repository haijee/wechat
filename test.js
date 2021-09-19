const fs = require('fs')

module.exports =  async function () {
    return new Promise((resolve,reject)=>{
        fs.readFile('test.html', (error,data) => {
            if (error) {
                reject()
            }else {
                resolve(data.toString())
            }
        }) 
    })
}