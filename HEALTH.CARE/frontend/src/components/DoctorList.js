import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RequestConsultation from './RequestConsultation';

const DoctorList = ({ patientId, userRole }) => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/consultations/doctors', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                console.log('Fetched Doctors:', response.data);
                setDoctors(response.data);
            } catch (error) {
                alert('Failed to load doctors. Please try again later.');
            }
        };

        fetchDoctors();
    }, []);

    const handleConsult = (doctorId) => {
        console.log('Consult button clicked for doctor ID:', doctorId);
        if (doctorId) {
            setSelectedDoctor(doctorId);
        } else {
            console.error('Doctor ID is undefined');
        }
    };

    const handleClose = () => {
        setSelectedDoctor(null);
    };

    return (
        <div className="relative p-6 bg-gradient-to-r from-indigo-100 to-blue-100 min-h-screen">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Available Doctors</h2>
            {doctors.length === 0 ? (
                <p className="text-center text-gray-500">No doctors available at this time.</p>
            ) : (
                <ul className="space-y-4">
                    {doctors.map(doctor => (
                        <li 
                            key={doctor.id} 
                            className="flex justify-between items-center p-4 border border-gray-300 rounded-lg shadow-lg bg-white transition-shadow duration-300 hover:shadow-2xl hover:scale-101"
                        >
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">{doctor.name}</h3>
                                <p className="text-gray-600">{doctor.specialization}</p>
                            </div>
                            {userRole === 'patient' && (
                                <button 
                                    className="ml-4 p-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition duration-200" 
                                    onClick={() => handleConsult(doctor.id)}
                                >
                                    Consult
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
            {selectedDoctor && (
                <RequestConsultation 
                    patientId={patientId} 
                    doctorId={selectedDoctor} 
                    onClose={handleClose} 
                />
            )}
        </div>
    );
};

export default DoctorList;
