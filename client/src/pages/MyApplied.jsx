import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import UserMenu from '../components/Layout/UserMenu';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Modal, Button } from 'antd';
import { useAuth } from '../context/auth';

const MyApplied = () => {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [appliedCount, setAppliedCount] = useState(0);
    const [auth, setAuth] = useAuth();
    console.log(auth);
    useEffect(()=>{
        if (auth) getJobs();
    },[auth])
    const getJobs = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/jobApp/getMyApplied/${auth.user.id}`);
            setJobs(res.data);
        } catch (error) {
            console.log(error.message);
            toast.error("Something went wrong");
        }
    };  

    useEffect(() => {
        const fetchAppliedCount = async () => {
            if (selectedJob) {
                try {
                    const res = await axios.get(`http://localhost:8080/jobApp/appliedCt/${selectedJob.id}`);
                    if (res.status === 200) {
                        setAppliedCount(res.data);
                    }
                } catch (error) {
                    console.log(error.message);
                    toast.error("Something went wrong");
                }
            }
        };
        fetchAppliedCount();
    }, [selectedJob]);

    const showModal = (job) => {
        setSelectedJob(job);
        setModalVisible(true);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const isApplied = (jobId) => {
        return appliedJobs.includes(jobId);
    }

    const handleApply = async () => {
        try {
            const res = await axios.post(`http://localhost:8080/jobApp/addJobApp`, { jobId: selectedJob.id });
            if (res.status === 201) {
                toast.success('Applied Successfully');
                setAppliedJobs([...appliedJobs, selectedJob.id]);
            }
        } catch (error) {
            console.log(error.message);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-2">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <h2 style={{ color: 'white' }}>My Applied Jobs</h2>
                        <div className="flex-wrap" style={{ display: "flex" }}>
                            {jobs.length > 0 ? (
                                jobs.map((job) => (
                                    <div key={job.id} style={{ margin: '10px' }}>
                                        <div className="card" style={{ width: '18rem', backgroundColor: 'skyblue' }}>
                                            <div className="card-body">
                                                <h5 className="card-title">{job.Job.role}</h5>
                                                <p className="card-text">{job.Job.jobDesc.substring(0,30)}...</p>
                                                <div>Company: {job.Job.company}</div>
                                                <div>Salary: {job.Job.salary}</div>
                                                <p>Skills Required: {job.Job.skillsReqd.join(', ')}</p>
                                                <p>Status: {job.status}</p>
                                                <Button type="primary" onClick={() => showModal(job)}>View</Button>
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

            <Modal
                visible={modalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                {selectedJob && (
                    <div>
                        <h3>{selectedJob.Job.role}</h3>
                        <h6>{selectedJob.Job.jobDesc}</h6>
                        <p>Company: {selectedJob.Job.company}</p>
                        <p>Salary: {selectedJob.Job.salary}</p>
                        <p>{selectedJob.Job.workLoc}</p>
                        <p>Skills Required: {selectedJob.Job.skillsReqd.join(', ')}</p>
                        <p>{appliedCount} candidates have applied</p>
                        {selectedJob && isApplied(selectedJob.id) ? (
                            <button className='btn btn-success'>Applied</button>
                        ) : (
                            <button onClick={handleApply} className='btn btn-success'>Apply</button>
                        )}
                    </div>
                )}
            </Modal>
        </Layout>
    );
};

export default MyApplied;
