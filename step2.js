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

function useCorrectFunc(paths){
    for(path of paths){
        if(path.slice(-4) === '.txt'){
            cat(path)
        } else if(path.startsWith('https')){
            webCat(path)
        } else{
            console.log(`Unsupported Path: ${path}`)
        }
    }
}

useCorrectFunc(process.argv.slice(2))