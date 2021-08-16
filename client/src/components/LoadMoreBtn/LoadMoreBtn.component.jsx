import React from "react";
import { Button, Spinner } from "react-bootstrap";
import "./LoadMoreBtn.styles.scss";
import { getPosts } from "../../redux/actions/postAction";
import { useDispatch, useSelector } from "react-redux";


const LoadMoreBtn = ({skip, limit}) => {
  const dispatch = useDispatch();
  const {loading, size} = useSelector(state => state.homePosts)

  const handleOnClick = () => {
    skip = skip + 5;
    dispatch(getPosts(skip, limit));
  }
 
  return (
    <div>
      {size >= 5 && (
        <Button variant="outline-primary" className="load-more-btn" size="md" onClick={handleOnClick}>
        {loading && (
           <Spinner as="span" animation="border" size="sm" role="status" />
        )}
        <span className="mx-2">Load More</span>
      </Button>
      )}
    </div>
  );
};

export default LoadMoreBtn;
