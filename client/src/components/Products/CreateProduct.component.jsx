import React, { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { listCategories } from "../../redux/actions/categoryAction";
import { Link } from "react-router-dom";
import { productImageUpload } from "../../utils/imageUpload";
import fileUpload from "../../utils/fileUpload";
import { createProduct } from "../../redux/actions/productAction";
import { toast } from "react-toastify";
import customStyles from "./SelectStyles";
import './Products.styles.scss'

function CreateProduct() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [surfaces, setSurfaces] = useState("");
  const [directions, setDirections] = useState("");
  const [activeIngredients, setActiveIngredients] = useState("");
  const [cautions, setCautions] = useState("");
  const [shelfLife, setShelfLife] = useState("");
  const [options, setOptions] = useState([]);
  const [additionalDoc, setAdditionalDoc] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const dispatch = useDispatch();
  const {
    userInfo: { token },
  } = useSelector((state) => state.auth);
  const { categories: productCategory } = useSelector((state) => state.categoryList);
  const { success, loading, error } = useSelector(
    (state) => state.productCreate
  );

  useEffect(() => {
    dispatch(listCategories(token));
  }, [dispatch, token]);

  useEffect(() => {
    if(productCategory.length !== 0) {
      const newOptions = [];
      productCategory.forEach((cate) => {
        newOptions.push({ value: cate._id, label: cate.name });
      });
      setOptions(newOptions);
    }
  }, [productCategory])

  const handleImage = async (proImage) => {
    setIsUploading(true);
    const response = await productImageUpload(proImage);
    setImage(response.url);
    setIsUploading(false);
  };

  const handleDocUpload = async (addDocuments) => {
    setIsUploading(true);
    const response = await fileUpload(addDocuments);
    setAdditionalDoc(response);
    setIsUploading(false);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    if (!name || !category || !image) {
      return window.alert("Please fill every field");
    }

    const newProduct = {
      name,
      image,
      category,
      description,
      additionalInfo: {
        surfaces,
        directions,
        activeIngredients,
        cautions,
        shelfLife,
      },
      additionalDocuments: additionalDoc,
    };

    dispatch(createProduct(newProduct));

    setName("");
    setImage("");
    setCategory("");
    setDescription("");
    setSurfaces("");
    setDirections("");
    setActiveIngredients("");
    setCautions("");
    setShelfLife("");
    setAdditionalDoc([]);
  };

  const handleError = () => {
    toast(error, { type: "error" });
  };

  const handleSuccess = () => {
    toast("Product Created Successfully", { type: "success" });
  };

  return (
    <Container className="px-5">
      <Link
        to="/admin/productlist"
        className="btn btn-light my-3"
        style={{ color: "#fff" }}
      >
        Go Back
      </Link>

      <h1 style={{ marginBottom: "30px" }}>Add Product</h1>
      <Form onSubmit={() => console.log("Handle Submit")}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="formFile">
          <Form.Label>Image</Form.Label>
          <Form.File
            id="image-file"
            label="Choose Product Image"
            custom
            onChange={(e) => handleImage(e.target.files[0])}
          ></Form.File>
        </Form.Group>

        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Select
            name="category"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Select Product Category"
            styles={customStyles}
            onChange={(val) => setCategory(val.value)}
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Enter Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <fieldset
          style={{
            border: "0.5px solid #C0C0C0",
            marginBottom: 20,
            borderRadius: "10px",
            padding: "10px",
            paddingLeft: "40px",
            paddingRight: "40px",
            marginTop: "40px",
          }}
        >
          <legend
            style={{
              width: "inherit",
              padding: "0 10px",
              borderBottom: "none",
            }}
          >
            Additional Information
          </legend>

          <Form.Group controlId="surfaces">
            <Form.Label>Surfaces</Form.Label>
            <Form.Control
              type="text"
              placeholder="Surfaces Information"
              value={surfaces}
              onChange={(e) => setSurfaces(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="surfaces">
            <Form.Label>Directions</Form.Label>
            <Form.Control
              type="text"
              placeholder="Direction of Use"
              value={directions}
              onChange={(e) => setDirections(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="surfaces">
            <Form.Label>Active Ingredients</Form.Label>
            <Form.Control
              type="text"
              placeholder="Active Ingredients of Product"
              value={activeIngredients}
              onChange={(e) => setActiveIngredients(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="surfaces">
            <Form.Label>Cautions</Form.Label>
            <Form.Control
              type="text"
              placeholder="Caution"
              value={cautions}
              onChange={(e) => setCautions(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="surfaces">
            <Form.Label>Shelf Life</Form.Label>
            <Form.Control
              type="text"
              placeholder="Shelf Life of Product"
              value={shelfLife}
              onChange={(e) => setShelfLife(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </fieldset>
        <Form.Group controlId="formFile">
          <Form.Label>
            Additional Document <span>(only pdf)</span>
          </Form.Label>
          <Form.File
            id="document-file"
            label="Safety Datasheet, Green Tag Certificate, HAD Certificate"
            accept="application/pdf"
            custom
            onChange={(e) => handleDocUpload(e.target.files)}
            multiple={true}
          ></Form.File>
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          style={{
            float: "right",
            marginBottom: "20px",
            paddingLeft: "60px",
            paddingRight: "60px",
            fontSize: 18,
          }}
          onClick={handleAddProduct}
          disabled={isUploading ? "true" : null}
        >
          {isUploading ? "Uploading..." : "Add"}
        </Button>
      </Form>
      {!loading && error && handleError()}
      {!loading && success && handleSuccess()}
    </Container>
  );
}

export default CreateProduct;
