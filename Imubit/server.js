const http = require('http');
var url = require('url');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 8080;

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
         
        if(path[0]== '/all.js'){
            fs.readFile("all.js",(err,all)=>{
                res.write(all)
                res.end()
            });
        }
         if(path[0] == "/ismvlgl") {
            var q = url.parse(req.url,true).query;
            var srcrow = q.srcrow;
            var srccol =q.srccol;
            var targetrow = q.targetrow;
            var targetcol = q.targetcol;
            var json = {"islegal":""}
            json["islegal"] = isMoveLegal(srcrow,srccol,targetrow,targetcol)
            res.write(JSON.stringify(json))
           res.end()
          }
         });  
        
        

 


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function isNumLegal(num){
    var number = parseInt(num)
     if(number >-1 && number <8)
        return 1;
    return 0;
}

function isMoveLegal(srcrow,srccol,targetrow,targetcol){
   if(isNumLegal(srcrow) == 1 && isNumLegal(srccol)== 1&&
        isNumLegal(targetrow) == 1&&isNumLegal(targetcol)==1) {
           var rowMove = Math.abs(srcrow - targetrow).toString();
           var colMove = Math.abs(srccol - targetcol).toString();
           if((rowMove == 1 && colMove == 2)||(rowMove == 2 && colMove == 1))
               return "1"
        }
    return "0";
}