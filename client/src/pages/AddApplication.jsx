import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import RecruiterMenu from "../components/Layout/RecruiterMenu";
import { useAuth } from "../context/auth";
const AddApplication = () => {
    const[auth,setAuth]=useAuth()
  const navigate = useNavigate();
  const [company,setCompany]=useState('')
  const [role,setRole]=useState('')
  const [salary,setSalary]=useState('')
  const [workLoc,setWorkLoc]=useState()
  const [newSkill, setNewSkill] = useState("");
  const [basedOutOff,setBasedOutOff]=useState()
  const [jd,setJd]=useState()
  const [skills,setSkills]=useState([])
//   console.log(auth)
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res=await axios.post('http://localhost:8080/job/createJob',{company,role,salary,workLoc,basedOutOff,jd,skills,userId:auth.user.id})
      if(res.status===201)
      toast.success('Job Posting created')
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
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
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-2">
            <RecruiterMenu />
          </div>
          <div className="col-md-9">
            <h1 style={{ color: "white" }}>Add Job Posting</h1>
            <div className="m-1 w-75">
              <div className="mb-3">
                <input
                  type="text"
                  value={role}
                  style={{ backgroundColor: "skyblue", color: "black" }}
                  placeholder="Role"
                  className="form-control"
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={jd}
                  style={{ backgroundColor: "skyblue", color: "black" }}
                  placeholder="Job Description"
                  className="form-control"
                  onChange={(e) => setJd(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={company}
                  style={{ backgroundColor: "skyblue", color: "black" }}
                  placeholder="Company"
                  className="form-control"
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={salary}
                  style={{ backgroundColor: "skyblue", color: "black" }}
                  placeholder="Salary"
                  className="form-control"
                  onChange={(e) => setSalary(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={basedOutOff}
                  style={{ backgroundColor: "skyblue", color: "black" }}
                  placeholder="Based Out Off"
                  className="form-control"
                  onChange={(e) => setBasedOutOff(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    checked={workLoc === "onsite"}
                    onChange={() => setWorkLoc("onsite")}
                  />
                  <label style={{color:'white'}} className="form-check-label" htmlFor="flexRadioDefault1">
                    Onsite
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    checked={workLoc === "remote"}
                    onChange={() => setWorkLoc("remote")}
                  />
                  <label style={{color:'white'}} className="form-check-label" htmlFor="flexRadioDefault2">
                    Remote
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    checked={workLoc === "hybrid"}
                    onChange={() => setWorkLoc("hybrid")}
                  />
                  <label style={{color:'white'}} className="form-check-label" htmlFor="flexRadioDefault1">
                    Hybrid
                  </label>
                </div>
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
              <div className="mb-3">
                <button
                  className="btn btn-success col-md-12"
                  onClick={handleCreate}
                >
                  ADD APPLICATION
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddApplication;