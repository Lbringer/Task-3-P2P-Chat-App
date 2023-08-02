import "./App.css";
import { useState } from "react";
import join from "./holepunch";
function App() {
  const [user, setUser] = useState(undefined);
  const [topic, setTopic] = useState("");
  const handleJoin = () => {
    const tar = document.querySelector("#username");
    setUser(tar.value);
    setTopic(join(topic));
  };
  const handleCreate = () => {
    const tar = document.querySelector("#username");
    setUser(tar.value);
    setTopic(join());
  };
  if (!user) {
    return (
      <>
        <>
          <h1>Welcome</h1>

          {
            <div>
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" />
              <br />
              <label htmlFor="topic">Password:</label>
              <input
                type="text"
                id="topic"
                onChange={(e) => setTopic(e.target.value)}
              />
              <br />
              <button onClick={handleJoin}>Join a room</button>
              <button onClick={handleCreate}>Create a room</button>
            </div>
          }
        </>
      </>
    );
  }
}

export default App;
