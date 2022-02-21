import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

import InputTodo from "./components/InputTodo";
import ListTodo from "./components/ListTodo";

function App() {
  
  const [childState, setChildState] = useState(false);

  const childCallback = () => {
    setChildState(!childState);
  };

  return (
    <>
      <div className="container">
        <InputTodo passToParent={childCallback} />
        <ListTodo childState={childState} />
      </div>
    </>
  );
}

export default App;
