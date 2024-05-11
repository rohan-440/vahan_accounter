import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
    const [accountData, setAccountData] = useState([]);

    useEffect(() => {
        fetchAccountData();
    }, []);

    const fetchAccountData = () => {
        axios.get('http://localhost:8000/')
            .then(res => {
                setAccountData(res.data); // Assuming your data is an array of objects
            })
            .catch(err => console.log(err))
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/delete/${id}`)
            .then(res => {
                console.log(res);
                // Refresh account data after successful deletion
                fetchAccountData();
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="container-fluid py-5" style={{ backgroundColor: '#0077be', color: '#fff', minHeight: '100vh' }}>
            <h1 className="text-center mt-4 mb-3" style={{ fontFamily: 'Arial, sans-serif', fontSize: '2.5rem', fontWeight: 'bold' }}>Welcome to Accounter</h1>
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card shadow-lg" style={{ backgroundColor: '#005a8d', borderRadius: '15px', border: 'none' }}>
                        <div className="card-header" style={{ backgroundColor: '#1a2930', color: '#fff', borderRadius: '15px 15px 0 0', borderBottom: 'none' }}>Account Details</div>
                        <div className="card-body" style={{ backgroundColor: '#005a8d', padding: '0' }}>
                            <table className="table table-dark table-striped mb-0">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Contact Number</th>
                                        <th>Date of Birth</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {accountData.map((account, index) => (
                                        <tr key={index}>
                                            <td>{account.name}</td>
                                            <td>{account.email}</td>
                                            <td>{account.contact_number}</td>
                                            <td>{account.data_of_birth}</td>
                                            <td>
                                                <Link to={`/update/${account.id}`}>
                                                    <button className="btn btn-primary mr-2">Update</button>
                                                </Link>
                                                <button onClick={() => handleDelete(account.id)} className="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="text-center mt-3">
                                <Link to="/create">
                                    <button className="btn btn-success btn-lg">Add Details</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
