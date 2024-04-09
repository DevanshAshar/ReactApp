import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import UserMenu from '../components/Layout/UserMenu';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Modal, Button, Input } from 'antd';

const Applications = () => {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [appliedCount, setAppliedCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    const getAppliedJobs = async () => {
        try {
            const res = await axios.get('http://localhost:8080/job/appliedJobs');
            setAppliedJobs(res.data);
        } catch (error) {
            console.log(error.message);
            toast.error("Something went wrong");
        }
    };

    const getJobs = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/job/allJobs`);
            setJobs(res.data);
        } catch (error) {
            console.log(error.message);
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        getJobs();
        getAppliedJobs();
    }, []);

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
    };

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

    // Filter jobs based on search query (role, description, skills)
    const filteredJobs = jobs.filter(job =>
        job.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.jobDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skillsReqd.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) || 
        job.company.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-2">
                        <UserMenu />
                    </div>
                    <div className="col-md-10">
                        {/* Search Bar */}
                        <Input
                            placeholder="Search jobs by role, description, or skills..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ marginBottom: '20px' }}
                        />

                        <h2 style={{ color: 'white' }}>Available Jobs</h2>
                        <div className="row">
                            {filteredJobs.length > 0 ? (
                                filteredJobs.map((job) => (
                                    <div className="col-md-4" key={job.id}>
                                        <div className="card mb-3" style={{ backgroundColor: 'skyblue' }}>
                                            <div className="card-body">
                                                <h5 className="card-title">{job.role}</h5>
                                                <p className="card-text">{job.jobDesc.substring(0, 50)}...</p>
                                                <div>Company: {job.company}</div>
                                                <div>Salary: {job.salary}</div>
                                                <p>Skills Required: {job.skillsReqd.join(', ')}</p>
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
                        <h3>{selectedJob.role}</h3>
                        <h6>{selectedJob.jobDesc}</h6>
                        <p>Company: {selectedJob.company}</p>
                        <p>Salary: {selectedJob.salary}</p>
                        <p>Location: {selectedJob.workLoc}</p>
                        <p>Skills Required: {selectedJob.skillsReqd.join(', ')}</p>
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

export default Applications;
