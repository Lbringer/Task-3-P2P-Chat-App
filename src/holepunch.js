const Hyperswarm = require("hyperswarm");
const goodbye = require("graceful-goodbye");
const crypto = require("hypercore-crypto");
const b4a = require("b4a");

const swarm = new Hyperswarm();
goodbye(() => swarm.destroy());

const join = (newTopic) => {
  // Keep track of all connections and console.log incoming data
  const conns = [];
  swarm.on("connection", (conn) => {
    const name = b4a.toString(conn.remotePublicKey, "hex");
    console.log("* got a connection from:", name, "*");
    conns.push(conn);
    conn.once("close", () => conns.splice(conns.indexOf(conn), 1));
    conn.on("data", (data) => console.log(`${name}: ${data}`));
  });

  // Broadcast stdin to all connections
  process.stdin.on("data", (d) => {
    for (const conn of conns) {
      conn.write(d);
    }
  });
  // Join a common topic
  const topic = newTopic ? b4a.from(newTopic, "hex") : crypto.randomBytes(32);
  const discovery = swarm.join(topic, { client: true, server: true });

  // The flushed promise will resolve when the topic has been fully announced to the DHT
  discovery.flushed().then(() => {
    console.log(conns.length);
    const joinString = b4a.toString(topic, "hex");
    console.log("joined topic:", joinString);
  });
  return b4a.toString(topic, "hex");
};

module.exports = join;
