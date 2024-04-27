const fs = require('fs')
const axios = require('axios');

function cat(path){
    fs.readFile(path , 'utf8', (error, data) =>{
        if(error){
            console.log('Error :', error)
            process.exit(1)
        }
        console.log(data)
    })
}

function webCat(url){
    axios.get(url)
        .then( resp =>{
            console.log(resp.data)
    })
    .catch( error => {
        console.error('Error: ', error)
        process.exit(1)
    })
}

function catWrite(path, filename){
    fs.readFile(path, 'utf8', (err, data) =>{
        if (err){
            console.log(err)
            process.exit(1)
        }else{
            fs.writeFile(filename, data, 'utf8', err =>{
                if (err){
                    console.log(err)
                    process.exit(1)
                }else{
                console.log('wrote to file')
                }
            })
        }
    })
}

async function webCatWrite(url, filename){
    try{
        await axios.get(url)
            .then(resp =>{
                fs.writeFile(filename, resp.data, 'utf8', (err =>{
                    if(err){
                        console.error(err)
                        process.exit(1)
                    }else{
                        console.log('wrote to file')
                    }
                }))
            })
    }catch(error){
        console.error(error)
        process.exit(1)
    }
}

if(process.argv[2] === '--out'){
    if (process.argv[4].startsWith('http')){
        webCatWrite(process.argv[4], process.argv[3])
    }else{
        catWrite(process.argv[4], process.argv[3])
    }
}