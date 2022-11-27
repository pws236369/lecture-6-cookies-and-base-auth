const http = require("http"); // build in in node js 🤓

const data = [
  { name: "nissan", age: 28 },
  { name: "adi", age: 82 },
];

const server = http.createServer((req, res) => {
  if (req.url === "/api/segel" && req.method === "GET") {
    // We need to add the method!
    res.writeHeader(200, { "Content-Type": "application/json" }); // Status & header
    res.write(JSON.stringify(data)); // build in js function, to convert json to a string
    res.end();
  } else if (req.url.match(/\/api\/segel\/\w+/) && req.method === "GET") {
    // RegExp. Read about it!
    const id = req.url.split("/")[3];
    res.writeHeader(200, { "Content-Type": "application/json" }); // Status & header
    res.write(JSON.stringify(data[id])); // build in js function, to convert json to a string
    res.end();
  } else if (req.url === "/api/segel" && req.method === "POST") {
    // We want to get data from the body.
    let body = "";
    req.on("data", (buff) => {
      body += buff.toString();
    });
    req.on("end", () => {
      const newElement = JSON.parse(body); // conver string to a json object.
      data.push(newElement);

      res.writeHeader(201, { "Content-Type": "application/json" }); // Status & header
      res.write(JSON.stringify("done")); // build in js function, to convert json to a string
      res.end();
    });
  } else {
    res.writeHeader(200, { "Content-Type": "text/html" }); // Status & header
    res.writeHeader(200, {
      "Set-cookie": ["mySecondCookie=yummy", "mySecureCookie=ohhwee; httponly"],
    });
    res.write("<h1>Yuumy </h1>");
    res.end();
  }
});

server.listen(4000, () => console.log("Server is running!"));
