import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Update() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/get/${id}`)
            .then(res => {
                const { name, email, contact_number, date_of_birth } = res.data[0]; // Assuming data is returned as an array with single object
                setName(name);
                setEmail(email);
                setContactNumber(contact_number);
                setDateOfBirth(date_of_birth);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            name: name,
            email: email,
            contact_number: contactNumber,
            date_of_birth: dateOfBirth
        };
        axios.put(`http://localhost:8000/update/${id}`, userData)
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="container-fluid py-5" style={{ backgroundColor: '#0077be', color: '#fff', minHeight: '100vh' }}>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg" style={{ backgroundColor: '#1a2930' }}>
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4" style={{ color: '#fff' }}>Update Information</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label" style={{ color: '#fff' }}>Name</label>
                                    <input value={name} onChange={(e) => setName(e.target.value)} name="name" type="text" className="form-control" id="name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label" style={{ color: '#fff' }}>Email</label>
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="email" className="form-control" id="email" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="contactNumber" className="form-label" style={{ color: '#fff' }}>Contact Number</label>
                                    <input value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} name="contactNumber" type="tel" className="form-control" id="contactNumber" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="dateOfBirth" className="form-label" style={{ color: '#fff' }}>Date of Birth</label>
                                    <input value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} name="dateOfBirth" type="date" className="form-control" id="dateOfBirth" />
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Update;
