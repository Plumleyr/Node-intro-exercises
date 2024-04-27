const fs = require('fs')

function cat(path){
    fs.readFile(path , 'utf8', (error, data) =>{
        if(error){
            console.log('Error :', error)
        }
        console.log(data)
    })
}

cat(process.argv[2])