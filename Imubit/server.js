const http = require('http');
var url = require('url');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 8080;


/*initialize the server*/
const server = http.createServer((req, res) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        var path = url.format(req.url).split('?')
        
        /*default page*/ 
        if(path[0]== '/'){
            fs.readFile("chess.html",(err,html)=>{
                res.write(html)
                res.end()
            });
        }
        
      /* API   https.../ismvlgl?rowA=&colA=&rowB=&colB=*/
         if(path[0] == "/ismvlgl") {
            var query = url.parse(req.url,true).query;
            var rowA = query.rowA;
            var colA =query.colA;
            var rowB = query.rowB;
            var colB = query.colB;
            var json = {"islegal":""}
            json["islegal"] = isMoveLegal(rowA,colA,rowB,colB)
            res.write(JSON.stringify(json))
            res.end()
          }
         });  
        
        

 
/*start server*/ 
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});



function isNumLegal(num){
    var number = parseInt(num)
     if(number >-1 && number <8)
        return 1;
    return 0;
}

function isMoveLegal(rowA,colA,rowB,colB){
   if(isNumLegal(rowA) == 1 && isNumLegal(colA)== 1&& 
        isNumLegal(rowB) == 1&&isNumLegal(colB)==1) {
            var rowMove = Math.abs(rowA - rowB).toString();
            var colMove = Math.abs(colA - colB).toString();
            if((rowMove == 1 && colMove == 2)||(rowMove == 2 && colMove == 1))
               return "1"
        }
    return "0";
}
