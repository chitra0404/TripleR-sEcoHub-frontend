import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Base_Url } from '../../config/api';
import { useNavigate } from 'react-router-dom';

function UserList() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${Base_Url}/api/getuser`)
            .then(res => {
                setUsers(res.data.message);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const deleteUser = (id) => {
        axios.delete(`${Base_Url}/api/user/${id}`)
            .then(() => {
                const updatedUsers = users.filter(user => user._id !== id);
                setUsers(updatedUsers);
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    };

    return (
        <div className='vh-100 vw-100 justify-content-center mt-5 pt-5'>
            <h2 className="bg-warning p-2 text-center">Consumer Details</h2>
            <table className='table table-hover border border-3 shadow-sm'>
                <thead className='table-dark'>
                    <tr>
                        <th>USERId</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Card Number</th>
                        <th>CVV</th>
                        <th>Expiry Date</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                            <td>{user.decryptedCardDetails.cardNumber}</td>
                            <td>{user.decryptedCardDetails.cardCVV}</td>
                            <td>{user.decryptedCardDetails.cardExpiry}</td>
                            <td>
                                <button
                                    type="button"
                                    className='btn btn-success'
                                    onClick={() => deleteUser(user._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserList;
