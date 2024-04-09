import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import RecruiterMenu from '../components/Layout/RecruiterMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Table, Input, Button, Space, Modal, Select } from 'antd';
import { useAuth } from '../context/auth';

const { Option } = Select;

const Applied = () => {
    const [auth,setAuth]=useAuth()
    const params = useParams();
    const [appliedCandidates, setAppliedCandidates] = useState([]);
    const [filteredCandidates, setFilteredCandidates] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [statusOptions] = useState(['shortlisted', 'rejected', 'under review']);

    const getApps = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/jobApp/getApplied/${params.id}`);
            setAppliedCandidates(res.data);
            setFilteredCandidates(res.data);
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    useEffect(() => {
        getApps();
    }, []);

    const handleSearch = value => {
        const filteredData = appliedCandidates.filter(candidate => {
            return Object.values(candidate.User).some(userProp =>
                (userProp?.toString() || '').toLowerCase().includes(value.toLowerCase())
            );
        });
        setSearchText(value);
        setFilteredCandidates(filteredData);
    };

    const handleStatusChange = async(appId, status) => {
        try {
            const res=await axios.post(`http://localhost:8080/jobApp/updateApp`,{appId,status})
            if(res.code==200){toast.success('Status updated')}
        } catch (error) {
            toast.error('Couldnt update status')
        }
    };

    const columns = [
        {
            title: 'First Name',
            dataIndex: ['User', 'firstName'],
            key: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: ['User', 'lastName'],
            key: 'lastName',
        },
        {
            title: 'Email',
            dataIndex: ['User', 'email'],
            key: 'email',
        },
        {
            title: 'Mobile',
            dataIndex: ['User', 'mobile'],
            key: 'mobile',
        },
        {
            title: 'Skills',
            dataIndex: ['User', 'skills'],
            key: 'skills',
            render: skills => (
                <span>{skills.join(', ')}</span>
            ),
        },
        {
            title: 'Resume',
            key: 'action',
            render: (text, record) => (
                <Button type="link" onClick={() => handleViewResume(record.User.resume)}>View Resume</Button>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => (
                <Select defaultValue={text} style={{ width: 120 }} onChange={(value) => handleStatusChange(record.id, value)}>
                    {statusOptions.map(option => <Option key={option} value={option}>{option}</Option>)}
                </Select>
            ),
        }
    ];

    const handleViewResume = (resumeUrl) => {
        Modal.info({
            title: 'Resume',
            content: (
                <div>
                    <embed src={resumeUrl} width="100%" height="600px" />
                </div>
            ),
            width: '80%',
            onOk() { },
        });
    };

    return (
        <Layout>
            <div className="container-fluid p-3 m-3">
                <div className="row">
                    <div className="col-md-2">
                        <RecruiterMenu />
                    </div>
                    <div className="col-md-9">
                        <h2 style={{color:'white'}}>Applied Candidates</h2>
                        <Input.Search
                            placeholder="Search candidates"
                            onChange={(e) => handleSearch(e.target.value)}
                            style={{ marginBottom: 16 }}
                        />
                        <Table
                            dataSource={filteredCandidates}
                            columns={columns}
                            bordered
                            pagination={false}
                            style={{ backgroundColor: 'blue' }}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Applied;
