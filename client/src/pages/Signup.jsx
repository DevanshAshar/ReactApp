import React, { useState } from "react";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useAuth } from "../context/auth";
export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    role: "",
  });
  const [auth, setAuth] = useAuth();
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "role") {
      setRole(value);
    }
    setFormData({ ...formData, [name]: value });
  };

  const [role, setRole] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, firstName, lastName, email, password } = formData;
    try {
      const { data } = await axios.post("http://localhost:8080/user/newUser", {
        username,
        firstName,
        lastName,
        email,
        password,
        role,
      });
      setAuth({
        ...auth,
        user: data.register,
        token: data.token,
      });
      localStorage.setItem("auth", JSON.stringify(data));
      toast.success("Signed Up Successfully");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error.message);
    }
  };
  const handleGoogleSignUp = () => {
    if (!role) return toast.error("Please provide role");
    Cookies.set("role", role);
    window.open(`http://localhost:8080/auth/google/callback`, "_self");
  };

  const handleLinkedInSignUp = () => {
    window.open(
      `http://localhost:8080/auth/linkedin/callback?role=${role}`,
      "_self"
    );
  };
  return (
    <Layout>
      <div className="signup-container" style={{ backgroundColor: "grey" }}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            style={{ backgroundColor: "#2c3e50" }}
            required
          />
          <input
            type="text"
            name="firstName"
            placeholder="Firstname"
            value={formData.firstName}
            onChange={handleChange}
            style={{ backgroundColor: "#2c3e50" }}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Lastname"
            value={formData.lastName}
            onChange={handleChange}
            style={{ backgroundColor: "#2c3e50" }}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={{ backgroundColor: "#2c3e50" }}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={{ backgroundColor: "#2c3e50" }}
            required
          />
          <div style={{ display: 'flex', alignItems: 'center' }}>
  <input
    type="radio"
    id="employee"
    name="role"
    value="employee"
    checked={role === "employee"}
    onChange={handleChange}
    style={{ marginRight: '5px' }} // Adjust as needed
  />
  <label htmlFor="employee">Employee</label>
  <input
    type="radio"
    id="recruiter"
    name="role"
    value="recruiter"
    checked={role === "recruiter"}
    onChange={handleChange}
    style={{ marginLeft: '10px' }} // Adjust as needed
  />
  <label htmlFor="recruiter">Recruiter</label>
</div>


          <button type="submit">Sign Up</button>
        </form>
        <div
          className="social-signup"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <button onClick={handleGoogleSignUp} style={{ cursor: "pointer" }}>
            <img
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7B63XVafjHTyNwJV8pH3IthJ-_FzqPyMoCg&usqp=CAU"
              }
              alt="Google Logo"
              className="social-logo"
              style={{ height: "40px" }}
            />
          </button>
          <div style={{ width: "10px" }}></div>
          <button onClick={handleLinkedInSignUp} style={{ cursor: "pointer" }}>
            <img
              src={
                "data:image/png;base64,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"
              }
              alt="LinkedIn Logo"
              className="social-logo"
              style={{ height: "40px" }}
            />
          </button>
        </div>
      </div>
    </Layout>
  );
}
