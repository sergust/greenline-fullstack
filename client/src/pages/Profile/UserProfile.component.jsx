import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Container} from 'react-bootstrap'
import UserProfileWindow from "../../components/UserProfileWindow/UserProfileWindow.component";
import { getProfileUsers, getProfilePost } from "../../redux/actions/profileAction";


const Profile = () => {
  const { profile } = useSelector(state => state);
  const { userInfo: {userId} } = useSelector(state => state.auth)
  const {users} = profile;
  const dispatch = useDispatch();

  useEffect(() => {
    if(users?.length !== 0) {
      const [user] = users;
      const {followers} = user;
      dispatch(getProfilePost(0, 5, followers[0]));
    }
  }, [users?.length, dispatch, users])

  useEffect(() => {
    if(profile.ids.every(item => item !== userId )){
      dispatch(getProfileUsers({ userId }));
    }
  }, [userId, dispatch, profile.ids]);

  return (
    <Container fluid = 'true'>
      <UserProfileWindow />
    </Container>
  );
};

export default Profile;
