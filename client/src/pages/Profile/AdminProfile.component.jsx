import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Container} from 'react-bootstrap'
import AdminProfileWindow from "../../components/AdminProfileWindow/AdminProfileWindow.component";
import { getProfileUsers, getProfilePost } from "../../redux/actions/profileAction"

const AdminProfile = () => {
  const { profile } = useSelector(state => state);
  const { userInfo: {userId} } = useSelector(state => state.auth)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfilePost(0, 5));
  }, [dispatch]);

  useEffect(() => {
    if(profile.ids.every(item => item !== userId )){
      dispatch(getProfileUsers({ userId }));
    }
  }, [userId, dispatch, profile.ids]);

  return (
    <Container fluid = 'true'>
      <AdminProfileWindow />
    </Container>
  );
};

export default AdminProfile;
