import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Create() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contactNumber: '',
        dob: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/create', formData);
            console.log('Data sent to backend:', response.data);
            navigate("/");
            // Optionally, you can handle success or show a success message here
        } catch (error) {
            console.error('Error sending data to backend:', error);
            // Optionally, you can handle error or show an error message here
        }
    };

    return (
        <div className="container-fluid py-5" style={{ backgroundColor: '#0077be', color: '#fff', minHeight: '100vh' }}>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg p-4" style={{ backgroundColor: '#1a2930' }}>
                        <h2 className="text-center mb-4" style={{ color: '#fff' }}>Create </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label" style={{ color: '#fff' }}>Full Name</label>
                                <input type="text" className="form-control" id="name" placeholder="Enter your full name" value={formData.name} name="name" onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label" style={{ color: '#fff' }}>Email Address</label>
                                <input type="email" className="form-control" id="email" placeholder="Enter your email address" value={formData.email} name="email" onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contactNumber" className="form-label" style={{ color: '#fff' }}>Contact Number</label>
                                <input type="tel" className="form-control" id="contactNumber" placeholder="Enter your contact number" value={formData.contactNumber} name="contactNumber" onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="dob" className="form-label" style={{ color: '#fff' }}>Date of Birth</label>
                                <input type="date" className="form-control" id="dob" value={formData.dob} name="dob" onChange={handleChange} required />
                            </div>
                            <div className="d-grid">
                                <button className="btn btn-primary btn-lg" type="submit" style={{ backgroundColor: '#ff9900', borderColor: '#ff9900' }}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Create;
