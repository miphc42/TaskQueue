import { InputGroup, FormControl, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
const InputTodo = ({ passToParent }) => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      passToParent(body);
      setDescription("");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <h1 className="text-center mt-5">Input Todo</h1>
      <InputGroup className="mb-3 mt-5">
        <FormControl
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          placeholder="Enter a task"
          aria-label=""
          aria-describedby=""
        />
        <Button
          onClick={onSubmitForm}
          className="btn btn-success"
          id="button-addon2"
        >
          Add
        </Button>
      </InputGroup>
    </>
  );
};

export default InputTodo;
