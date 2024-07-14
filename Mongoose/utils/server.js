const mongoose = require("mongoose");

async function startServer() {
  try {
    await mongoose.connect(
      "mongodb+srv://muricamar2004:EIepBuaABD7d7VQg@nodejs.vbqigm9.mongodb.net/",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = startServer;
