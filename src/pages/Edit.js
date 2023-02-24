import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import { axiosClient } from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import "./editNew.css";

function Edit() {
  const navigate = useNavigate();

  const editContact = useSelector((state) => state.contact.edit);

  const [firstname, setFirstName] = useState(editContact.firstName);
  const [lastname, setLastName] = useState(editContact.lastName);
  const [number, setNumber] = useState(editContact.phone);
  const [load, setload] = useState(false);

  // useEffect(() => {
  //   setFirstName(editContact.firstName);
  //   setLastName(editContact.lastName);
  //   setNumber(editContact.phone);
  // }, []);

  async function edithandler() {
    setload(true);
    const res = await axiosClient.put("/edit", {
      firstName: firstname,
      lastName: lastname,
      phone: number,
      id: editContact._id,
    });

    setload(false);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }

  return (
    <div className="edit">
      {load && <Loader />}
      <h1>Edit Contact</h1>
      <div className="form">
        <div className="input">
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="input">
          <label htmlFor="Lastname">Last Name</label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="input">
          <label htmlFor="number">Number</label>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <div className="buttonBox">
          <button className="save-btn" onClick={edithandler}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Edit;
