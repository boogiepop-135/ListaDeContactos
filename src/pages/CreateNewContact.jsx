import React, { useState } from 'react';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'; 
import '../CreateNewContact.css';
const CreateNewContact = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState(null); // Estado para manejar errores

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Limpiamos el error antes de intentar

    try {
      const response = await fetch(store.apiUrl + '/agendas/' + store.agendaSlug + '/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      });

      if (!response.ok) {
        throw new Error("Ocurrió un error al crear el contacto");
      }

      setContact({
        name: "",
        email: "",
        phone: "",
        address: "",
      });

      navigate('/');
    } catch (error) {
      setError(error.message); // Mostramos el error al usuario
    }
  };

  return (
    <div className="create-contact-container">
      <div className="row justify-content-md-center mt-5">
        <form className="col-lg-4 col-md-6 create-contact-form" onSubmit={handleSubmit}>
          <h1 className="create-contact-title">Add a New Contact</h1>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <div className="mb-4 input-group">
            <span className="input-group-icon">
              <FaUser />
            </span>
            <div className="form-floating">
              <input
                type="text"
                name="name"
                value={contact.name}
                className="form-control"
                placeholder="Full Name"
                onChange={handleChange}
                id="nameInput"
              />
              <label htmlFor="nameInput">Name</label>
            </div>
          </div>

          <div className="mb-4 input-group">
            <span className="input-group-icon">
              <FaPhone />
            </span>
            <div className="form-floating">
              <input
                type="tel"
                name="phone"
                value={contact.phone}
                className="form-control"
                placeholder="Enter phone"
                onChange={handleChange}
                id="phoneInput"
              />
              <label htmlFor="phoneInput">Phone</label>
            </div>
          </div>

          <div className="mb-4 input-group">
            <span className="input-group-icon">
              <FaEnvelope />
            </span>
            <div className="form-floating">
              <input
                type="email"
                name="email"
                value={contact.email}
                className="form-control"
                placeholder="Enter email"
                onChange={handleChange}
                id="emailInput"
              />
              <label htmlFor="emailInput">Email</label>
            </div>
          </div>

          <div className="mb-4 input-group">
            <span className="input-group-icon">
              <FaMapMarkerAlt />
            </span>
            <div className="form-floating">
              <input
                type="text"
                name="address"
                value={contact.address}
                className="form-control"
                placeholder="Enter address"
                onChange={handleChange}
                id="addressInput"
              />
              <label htmlFor="addressInput">Address</label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary create-contact-btn">
            Register Contact
          </button>

          <div className="d-flex justify-content-center mt-4">
            <Link to="/">
              <button className="btn btn-danger go-home-btn">
                Go Home
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewContact;