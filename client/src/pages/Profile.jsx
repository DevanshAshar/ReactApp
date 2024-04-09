import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";
import Layout from "../components/Layout/Layout";
import UserMenu from "../components/Layout/UserMenu";
import Cookies from 'js-cookie';
const Profile = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([]);
  const [mobile, setMobile] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [resume, setResume] = useState(null);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const { email, firstName, lastName, description, mobile, skills,resume } =
      auth.user;
    setFirstname(firstName);
    setLastname(lastName);
    setEmail(email);
    setMobile(mobile);
    setDescription(description);
    setSkills(skills || []);
    setResume(resume)
  }, [auth?.user]);
  const handleAddSkill = () => {
    if (newSkill.trim() !== "" && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };
  
  const handleRemoveSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };
  const handleSubmit = async () => {
    try {
      const res = await axios.post(`http://localhost:8080/user/updateDetails`, {
        firstname,
        lastname,
        email,
        mobile: mobile,
        description: description,
        skills,
      });
      if (res.status === 200) {
        setAuth((prevAuth) => ({
          ...prevAuth,
          user: {
            ...prevAuth.user,
            firstname,
            mobile,
            description,
            skills,
          },
        }));
        const formData = new FormData();
        formData.append("resume", resume);
        axios
          .post("http://localhost:8080/user/uploadRezume", formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            console.log("File uploaded successfully");
          })
          .catch((error) => {
            console.error("Error uploading file:", error);
          });
          setAuth((prevAuth) => ({
            ...prevAuth,
            user: {
              ...prevAuth.user,
              resume: res.data.resume,
            },
          }));
        toast.success("Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setResume(file);
  };
  const viewResume = () => {
    if (auth.user.resume) {
      window.open(auth.user.resume, "_blank");
    } else {
      toast.error("No resume uploaded");
    }
  };
  
  console.log(auth.user)
  return (
    <Layout>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-2">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 style={{ color: "white" }}>Your Profile</h1>
            <div className="form-container">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                }}
              >
                <div className="my-3">
                  <input
                    style={{ backgroundColor: "skyblue", color: "black" }}
                    type="text"
                    className="form-control"
                    id="exampleInputUsername"
                    value={firstname}
                    onChange={(e) => {
                      setFirstname(e.target.value);
                    }}
                    placeholder="Firstname"
                  />
                </div>
                <div className="my-3">
                  <input
                    style={{ backgroundColor: "skyblue", color: "black" }}
                    type="text"
                    className="form-control"
                    id="exampleInputUsername"
                    value={lastname}
                    onChange={(e) => {
                      setLastname(e.target.value);
                    }}
                    placeholder="Lastname"
                  />
                </div>
                <div className="my-3">
                  <input
                    style={{ backgroundColor: "skyblue", color: "black" }}
                    type="email"
                    className="form-control"
                    id="exampleInputEmail"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    placeholder="Email"
                    disabled
                  />
                </div>
                <div className="my-3">
                  <input
                    style={{ backgroundColor: "skyblue", color: "black" }}
                    type="text"
                    className="form-control"
                    id="exampleInputMobile"
                    value={mobile}
                    onChange={(e) => {
                      setMobile(e.target.value);
                      console.log(mobile);
                    }}
                    placeholder="Mobile"
                  />
                </div>
                <div className="my-3">
                  <input
                    style={{
                      backgroundColor: "skyblue",
                      color: "black",
                      "input::placeholder": { color: "white" },
                    }}
                    type="text"
                    className="form-control"
                    id="exampleInputAddress"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    placeholder="Description"
                  />
                </div>
                <div className="my-3">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="my-3">
                  <button className="btn btn-primary" onClick={viewResume}>
                    View Resume
                  </button>
                </div>
                <div className="my-3">
                  <input
                    type="text"
                    className="form-control"
                    style={{
                      backgroundColor: "skyblue",
                      color: "black",
                    }}
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Enter Skill"
                  />
                  <button
                    type="button"
                    className="btn btn-primary mt-2"
                    onClick={handleAddSkill}
                  >
                    Add Skill
                  </button>
                </div>
                <div>
                  <h5 style={{ color: "white" }}>Your Skills:</h5>
                  {skills.map((skill, index) => (
                    <div key={index} className="d-flex align-items-center">
                      <input
                        type="text"
                        className="form-control mr-2"
                        value={skill}
                        style={{
                          backgroundColor: "skyblue",
                          color: "black",
                        }}
                        onChange={(e) => {
                          const updatedSkills = [...skills];
                          updatedSkills[index] = e.target.value;
                          setSkills(updatedSkills);
                        }}
                      />
                      <button
                        type="button"
                        style={{ margin: "7px" }}
                        className="btn btn-sm btn-danger"
                        onClick={() => handleRemoveSkill(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <button onClick={handleSubmit} className="btn btn-success">
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
