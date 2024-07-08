const handleRequest = (req, res) => {
  const { url, method } = req;

  if (url === "/") {
    res.write("<html>");
    res.write("<head> <title>My page</title> </head>");
    res.write(
      '<body> <h1>Welcome to my page </h1> <form action="/create-user" method="POST"> <label for="username">Username</label> <input type="text" id="username" name="create-user" placeholder="Your username..."/> <button>Send</button> </form> </body>'
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split("=")[1];
      console.log(username);
      res.statusCode = 302;
      res.setHeader("Location", "/users");
      return res.end();
    });
  }

  if (url === "/users") {
    res.write("<html>");
    res.write("<head> <title>My page</title> </head>");
    res.write("<body> <ul> <li>User1</li> </ul> </body>");
    res.write("</html>");
    return res.end();
  }

  res.setHeader("Content-Type", "text/html");

  res.write("<html>");
  res.write("<head> <title>My First Page</title> </head>");
  res.write("<body> <h1>Hello</h1> </body>");
  res.write("</html>");
  res.end();
};

module.exports = handleRequest;
