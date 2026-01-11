const http = require("http")
const fs = require("fs")
const path = require("path")

const port = 3000

const types = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript"
}

http.createServer((req, res) => {
  let file = req.url === "/" ? "/index.html" : req.url
  let filePath = "." + file
  let ext = path.extname(filePath)

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" })
      res.end("404")
      return
    }
    res.writeHead(200, { "Content-Type": types[ext] || "text/plain" })
    res.end(data)
  })
}).listen(port)

console.log("Watel rodando em http://localhost:" + port)
