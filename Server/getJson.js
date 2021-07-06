//getJson

var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'MyQLPwdU18U4',
    database: 'myapp_db'
});

function getJson(key){
    var fs = require('fs');
    conn.connect(function(err){
        if(err) throw err;
        console.log('Database connected successfully !');

        conn.query(`SELECT * from tbl_epub WHERE id IN ('${key}')`, function(err,row,fields){
            if(err) throw err;
            //console.log(row);

            var o = {};
            var book = row[0];
            o[key] = [];

            o[key] = {
                id: key,
                title: (`${book.title}`),
                author: (`${book.author}`),
                year: (`${book.year}`),
                pages: (`${book.pages}`),
                downloads: (`${book.downloads}`),
                ISBN: (`${book.ISBN}`),
                genres: (`${book.genres}`) //i dont know what datatype MySQL uses for arrays, so i can't implement it as a JSON
            };

            let data = JSON.stringify(o, null, 2);
            //console.log(data);

            fs.writeFileSync('info.json', data);

        })
    });
}


module.exports = conn;
