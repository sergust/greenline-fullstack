import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { FAIL } from "../../redux/actions/action.types";
import { addUser, getConversations } from "../../redux/actions/messageAction";
import { getDataAPI } from "../../utils/fetchData";
import UserCard from "../UserCard/UserCard";

const LeftSide = () => {
  const { auth, message } = useSelector((state) => state);
  const { userInfo } = auth;
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const pageEnd = useRef();
  const [page, setPage] = useState(0);

  const [search, setSearch] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return setSearchUsers([]);

    try {
      const res = await getDataAPI(`users/search?email=${search}`, userInfo?.token);
      setSearchUsers(res.data.users);
    } catch (err) {
      dispatch({
        type: FAIL,
        payload: { error: err.response.data.msg },
      });
    }
  };

  const handleAddUser = (user) => {
    setSearch("");
    setSearchUsers([]);
    dispatch(addUser({ user, message }));
    return history.push(`/conversation/${user._id}`);
  };

  const isActive = (user) => {
    if (id === user._id) return "active";
    return "";
  };

  useEffect(() => {
    if (message.firstLoad) return;
    dispatch(getConversations({ auth: userInfo }));
  }, [dispatch, userInfo, message.firstLoad]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((p) => p + 1);
        }
      },
      {
        threshold: 0.1,
      }
    );
    observer.observe(pageEnd.current);
  }, [setPage]);

  useEffect(() => {
    if (message.resultUsers >= (page - 1) * 9 && page > 1) {
      dispatch(getConversations({ auth: userInfo, page }));
    }
  }, [message.resultUsers, page, userInfo, dispatch]);

  return (
    <>
      <form className="message_header" onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          className="px-4"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search user by email..."
        />

        <button style={{ display: "none" }} type="submit" id="search">
          Search
        </button>
      </form>

      <div className="message_chat_list">
        {searchUsers.length !== 0 ? (
          <>
            {searchUsers.map((user) => (
              <div
                key={user._id}
                className={`message_user ${isActive(user)}`}
                onClick={() => handleAddUser(user)}
              >
                <UserCard user={user} />
              </div>
            ))}
          </>
        ) : (
          <>
            {message.users.map((user) => (
              <div
                key={user._id}
                className={`message_user ${isActive(user)}`}
                onClick={() => handleAddUser(user)}
              >
                <UserCard user={user} msg={true}>
                  <i className="fas fa-circle" />
                </UserCard>
              </div>
            ))}
          </>
        )}

        <button style={{ opacity: 0 }} ref={pageEnd}>
          Load more..
        </button>
      </div>
    </>
  );
};

export default LeftSide;
