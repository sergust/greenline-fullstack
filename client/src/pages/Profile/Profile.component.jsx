import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Container} from 'react-bootstrap'
import ProfileWindow from "../../components/ProfileWindow/ProfileWindow.component";
import { getProfileUsers } from "../../redux/actions/profileAction"


const Profile = () => {
  const { profile } = useSelector(state => state);
  const { userInfo: {userId} } = useSelector(state => state.auth)
  const dispatch = useDispatch();

  useEffect(() => {
    if(profile.ids.every(item => item !== userId )){
      dispatch(getProfileUsers({ userId }));
    }
  }, [userId, dispatch, profile.ids]);

  return (
    <Container fluid = 'true'>
      <ProfileWindow />
    </Container>
  );
};

export default Profile;
