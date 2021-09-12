import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import { createCategory } from "../../redux/actions/categoryAction";
import { toast } from "react-toastify";

function CreateCategory() {
  const [category, setCategory] = useState("");
  const {loading, success} = useSelector(state => state.categoryCreate);

  const dispatch = useDispatch();
  const {userInfo: {token}} = useSelector(state => state.auth);

  const handleSuccess = () => {
    toast('Category Successfully Added', {
      type: 'success'
    })
  }

  const handleAddCategory = (e) => {
    e.preventDefault();
    const newCategory = {
      name: category,
    }

    dispatch(createCategory(token, newCategory));

    setCategory("");
  }

  return (
    <Container>
      <Link
        to="/admin/categorylist"
        className="btn btn-light my-3"
        style={{ color: "#fff" }}
      >
        Go Back
      </Link>

      <h1 style={{ marginBottom: "30px" }}>Add Category</h1>
      <div
        style={{ border: "0.5px solid #D3D3D3", padding: 50, borderRadius: 10 }}
      >
        <Form onSubmit={() => console.log("Handle Submit")}>
          <Form.Group controlId="name">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Category Name"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            style={{
              float: "right",
              marginBottom: "20px",
              paddingLeft: "35px",
              paddingRight: "35px",
            }}
            onClick={handleAddCategory}
          >
            Add
          </Button>
          {!loading && success && handleSuccess()}
        </Form>
      </div>
    </Container>
  );
}

export default CreateCategory;
