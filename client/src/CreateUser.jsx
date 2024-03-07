import axios from "axios";
import { useState } from "react";
import { addUser } from "./redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [post, setPost] = useState("");
  const [doj, setDOJ] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/create", { name, email, post, doj })
      .then((res) => {
        dispatch(addUser(res.data));
        navigate("/");
      })  
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vw-100 vh-100 bg-primary justify-content-center align-items-center ">
      <div className="w-50 bg-white rounded p-3 ">
        <form onSubmit={handleSubmit}>
          <h2>Add User</h2>
          <div className="mb-2">
            <label htmlFor="">Name : </label>
            <input
              type="text"
              placeholder="Enter Name."
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Email : </label>
            <input
              type="email"
              placeholder="Enter Email."
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Post : </label>
            <input
              type="text"
              placeholder="Enter Position."
              className="form-control"
              onChange={(e) => setPost(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">DOJ : </label>
            <input
              type="text"
              placeholder="MMM YYYY"
              className="form-control"
              onChange={(e) => setDOJ(e.target.value)}
            />
          </div>
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
