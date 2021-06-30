function bookSearch(search) {
    //I have no idea if this works yet
    conn.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        conn.query("SELECT * FROM tbl_book", function(err, result) {
            if (err) throw err;
            var data = [];
            for(var i = 0; i < result.length; i++) {
                if(result["book_name"].includes(search)) {
                    data.push(result["book_name"]);
                }
            }
            return data;
        });
      });
}
