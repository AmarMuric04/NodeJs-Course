const fs = require("fs");

const handleRequest = (req, res) => {
  const { url, method } = req;

  if (url === "/") {
    res.write("<html>");
    res.write("<head> <title>My First Page</title> </head>");
    res.write(
      '<body> <form action="/message" method="POST"> <input type="text" name="message"> <button>Submit</button> </form> </body>'
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const message = parsedBody.split("=")[1];
      fs.writeFile("1/message.txt", message, (error) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  console.log(req.url, req.method, req.headers);
  // process.exit();
  res.setHeader("Content-Type", "text/html");

  res.write("<html>");
  res.write("<head> <title>My First Page</title> </head>");
  res.write("<body> <h1>Hello</h1> </body>");
  res.write("</html>");
  res.end();
};

module.exports = {
  handler: handleRequest,
  someText: "Some text",
};
