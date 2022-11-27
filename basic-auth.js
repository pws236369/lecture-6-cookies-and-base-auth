const http = require("http"); // build in in node js 🤓

const server = http.createServer((req, res) => {
  const auth = req.headers.authorization || ""; // Get the header

  const userDetails = auth.trim().replace(/Basic\s+/i, ""); // Get username:password
  const decoded = Buffer.from(userDetails, "base64").toString("ascii"); // decode it

  console.log(decoded);

  // Set headers!
  if (decoded === "admin:nisso") {
    res.writeHeader(200, { "Content-Type": "text/html" });
    res.write("<h1>IM IN!!!</h1>");
    res.end();
  } else {
    res.setHeader("WWW-Authenticate", "Basic");
    res.statusCode = 401;
    res.end();
  }
});

server.listen(4000, () => console.log("Server is running!"));
