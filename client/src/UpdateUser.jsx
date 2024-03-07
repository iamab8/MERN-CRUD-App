import axios from "axios";
import { useState } from "react";
import { updateUser } from "./redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
  const { id } = useParams();
  const users = useSelector((state) => state.users.users);
  const user = users.find((user) => user.id === id);
  // console.log(user);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [post, setPost] = useState(user.post);
  const [doj, setDOJ] = useState(user.doj);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/update/" + id, { name, email, post, doj })
      .then(() => {
        dispatch(updateUser({ id, name, email, post, doj }));
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vw-100 vh-100 bg-primary justify-content-center align-items-center ">
      <div className="w-50 bg-white rounded p-3 ">
        <form onSubmit={handleUpdate}>
          <h2>Update User</h2>
          <div className="mb-2">
            <label htmlFor="">Name : </label>
            <input
              type="text"
              placeholder="Enter Name."
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Email : </label>
            <input
              type="email"
              placeholder="Enter Email."
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Post : </label>
            <input
              type="text"
              placeholder="Enter Position."
              className="form-control"
              value={post}
              onChange={(e) => setPost(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">DOJ : </label>
            <input
              type="text"
              placeholder="MMM YYYY"
              className="form-control"
              value={doj}
              onChange={(e) => setDOJ(e.target.value)}
            />
          </div>
          <button className="btn btn-success">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
