import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import { useState } from "react";
const EditTodo = ({ data, updateTodos }) => {

  const [description, setDescription] = useState(data.description);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setDescription(data.description);
  };
  
  const handleShow = () => setShow(true);

  const editTodo = async () => {
    try {
      const body = { description };
      await fetch(`http://localhost:5000/todos/${data.todo_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      setShow(false);
      await updateTodos();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="Enter a task"
              aria-label=""
              aria-describedby=""
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-danger"
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button variant="primary" onClick={editTodo}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditTodo;
