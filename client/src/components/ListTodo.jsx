import { Table, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import EditTodo from "./EditTodo";

const ListTodo = ({ childState }) => {
  const [todos, setTodos] = useState([]);

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const updateTodos = async () => {
    const response = await fetch("http://localhost:5000/todos");
    const jsonData = await response.json();
    setTodos(jsonData.sort((a, b) => {
      if ( a.todo_id < b.todo_id ){
        return -1;
      }
      if ( a.todo_id > b.todo_id ){
        return 1;
      }
      return 0;
    }));
  };

  useEffect(() => {
    getTodos();
  }, [childState]);

  return (
    <>
      <Table striped hover className="text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((data) => {
            return (
              <tr key={data.todo_id}>
                <td>{data.description}</td>
                <td>
                  <EditTodo data={data} updateTodos={updateTodos} />
                </td>
                <td>
                  <Button
                    className="btn-danger"
                    onClick={() => deleteTodo(data.todo_id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default ListTodo;
