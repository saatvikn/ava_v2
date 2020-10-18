const AvaClient = require("./Structures/AvaClient");
const config = require("../config.json");

require("dotenv").config();

const client = new AvaClient(config);
client.start();
