import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import RecruiterMenu from "../components/Layout/RecruiterMenu";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Modal, Button } from "antd";
import { useNavigate } from "react-router-dom";

const PastPostings = () => {
  const [postings, setPostings] = useState([]);
  const [auth, setAuth] = useAuth();
  console.log(auth);
  const navigate=useNavigate()
  useEffect(() => {
    const getPast = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/job/pastPostings/${auth.user.id}`
        );
        setPostings(res.data);
      } catch (error) {
        console.log(error);
        //   toast.error("Something went wrong");
      }
    };
    if (auth) getPast();
  }, [auth]);

  return (
    <Layout>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-2">
            <RecruiterMenu />
          </div>
          <div className="col-md-9">
            <h2 style={{ color: "white" }}>Past Postings</h2>
            <div className="flex-wrap" style={{ display: "flex" }}>
              {postings.length > 0 ? (
                postings.map((job) => (
                  <div key={job.id} style={{ margin: "10px" }}>
                    <div
                      className="card"
                      style={{ width: "18rem", backgroundColor: "skyblue" }}
                    >
                      <div className="card-body">
                        <h5 className="card-title">{job.role}</h5>
                        <p className="card-text">
                          {job.jobDesc.substring(0, 30)}...
                        </p>
                        <div>Company: {job.company}</div>
                        <div>Salary: {job.salary}</div>
                        <p>Skills Required: {job.skillsReqd.join(", ")}</p>
                        <Button
                          type="primary"
                          style={{marginRight:'4px'}}
                          onClick={() =>navigate(`/applied/${job.id}`) }
                        >
                          View Candidates
                        </Button>
                        {!job.closed ? (
                          <Button
                            type="primary"
                            style={{ backgroundColor: "red" }}
                            onClick={() => console.log("close")}
                          >
                            Close
                          </Button>
                        ) : (
                          <Button
                            type="primary"
                            style={{ backgroundColor: "green" }}
                            onClick={() => console.log("open")}
                          >
                            Open
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No Job Postings</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PastPostings;
