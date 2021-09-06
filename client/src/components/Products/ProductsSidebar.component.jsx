import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listCategories } from "../../redux/actions/categoryAction";
import { listProducts } from "../../redux/actions/productAction";

function ProductsSidebar() {
  const [isActive, setIsActive] = useState("");
  const dispatch = useDispatch();
  const {
    userInfo: { token },
  } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.categoryList);

  useEffect(() => {
    dispatch(listCategories(token));
  }, [dispatch, token]);

  const handleProductCategory = (catId) => {
    setIsActive(catId);
    dispatch(listProducts(token, catId));
  };

  const handleProductClick = () => {
    dispatch(listProducts(token));
    setIsActive("");
  }

  return (
    <div>
      <h4 style={{ marginBottom: "20px", cursor: "pointer" }} onClick={handleProductClick}>Products</h4>
      {categories.map((cate) => (
        <p
          key={cate._id}
          onClick={() => handleProductCategory(cate._id)}
          style={{
            cursor: "pointer",
            color: `${isActive === cate._id ? "#05a684" : "#1b1b1b"}`,
            fontWeight: `${isActive === cate._id ? "600" : "400"}`
          }}
          className="category-item"
        >
          {cate.name}
        </p>
      ))}
    </div>
  );
}

export default ProductsSidebar;
