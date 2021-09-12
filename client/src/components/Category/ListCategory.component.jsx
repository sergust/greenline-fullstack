import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Fill } from "react-icons/ri";
import './Category.styles.scss'
import { listCategories, deleteCatergory } from "../../redux/actions/categoryAction";

function ListCategory() {
  const { categories } = useSelector(state => state.categoryList);
  const { success: deleteSuccess } = useSelector(state => state.categoryDelete);
  const { userInfo: {token}} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listCategories(token));
  }, [dispatch, deleteSuccess, token]);

  const handleDeleteCategory = (categoryId) => {
    const isSure = window.confirm('Are you sure you want to delete?');
    if(!isSure) return;
    dispatch(deleteCatergory(categoryId, token))
  }

  return (
    <>
      <Row className="align-items-center" style={{ margin: "80px" }}>
        <Col>
          <h3>Categories</h3>
        </Col>
        <Col className="text-right">
          <Link to="/admin/category/create">
            <Button className="my-3">
              <i className="fas fa-plus"></i> Create Category
            </Button>
          </Link>
        </Col>
      </Row>
      <div style={{ margin: "80px", marginTop: "-80px" }}>
          <ListGroup>
            {categories?.map(cate => (
              <ListGroup.Item key={cate._id}>
              <span> {cate.name} </span>
              <span style = {{float: 'right'}}>
              <button
                className="btn-dlt"
                onClick={() => handleDeleteCategory(cate._id)}
              >
                <RiDeleteBin6Fill color="#c21808" size={20} />
              </button>
              </span>
            </ListGroup.Item>
            ))}
          </ListGroup>
      </div>
    </>
  );
}

export default ListCategory;
