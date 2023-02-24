import React, { useState } from "react";
import "./editNew.css";
import Loader from "../components/Loader";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../utils/axiosClient";

function NewContact() {
  const fname = useRef();
  const lname = useRef();
  const num = useRef();
  const navigate = useNavigate();

  const [msg, setmsg] = useState(false);
  const [load, setload] = useState(false);
  const [formErrors, setformErrors] = useState({
    firstName: false,
    lastName: false,
    phone: false,
  });

  async function addNewContactHandler() {
    const firstName = fname.current.value;
    const lastName = lname.current.value;
    const phone = num.current.value;

    if (!firstName || firstName?.length <= 0) {
      setformErrors({ lastName: false, phone: false, firstName: true });
      return;
    }
    if (!lastName || lastName?.length <= 0) {
      setformErrors({ firstName: false, phone: false, lastName: true });
      return;
    }
    if (!phone || phone?.length !== 10 || phone < 0) {
      setformErrors({ firstName: false, lastName: false, phone: true });
      return;
    } else {
      console.log("all good");
      setformErrors({
        firstName: false,
        lastName: false,
        phone: false,
      });
    }

    setload(true);

    try {
      const res = await axiosClient.post("/new", {
        firstName,
        lastName,
        phone,
      });
      setload(false);
      setmsg("Contact Added Successfully");
      setTimeout(() => {
        navigate("/");
      }, 1200);
      console.log("response from API new contact :", res);
    } catch (err) {
      setmsg("Some Error Occured");
      setload(false);
    }
  }

  return (
    <div className="edit">
      {load && <Loader></Loader>}
      {msg ? (
        <div className="msg">{msg}</div>
      ) : (
        <>
          <h1>Add New Contact</h1>
          <div className="form">
            {/* <div className="input">
              <label htmlFor="firstname">First Name</label>
              <input type="text" ref={fname} />
            </div> */}

            <div className="input">
              <label htmlFor="firstname">First Name</label>
              <input type="text" ref={fname} />
              {formErrors.firstName && (
                <label
                  htmlFor="error"
                  className="error"
                  style={{ color: "red", fontSize: "0.9rem" }}
                >
                  Empty First name
                </label>
              )}
            </div>

            {/* <div className="input">
              <label htmlFor="Lastname">Last Name</label>
              <input type="text" ref={lname} />
            </div> */}

            <div className="input">
              <label htmlFor="Lastname">Last Name</label>
              <input type="text" ref={lname} />
              {formErrors.lastName && (
                <label
                  htmlFor="error"
                  className="error"
                  style={{ color: "red", fontSize: "0.9rem" }}
                >
                  Empty last name
                </label>
              )}
            </div>

            {/* <div className="input">
              <label htmlFor="number">Number</label>
              <input type="number" ref={num} />
            </div> */}

            <div className="input">
              <label htmlFor="number">Number</label>
              <input type="number" ref={num} />
              {formErrors.phone && (
                <label
                  htmlFor="error"
                  className="error"
                  style={{ color: "red", fontSize: "0.9rem" }}
                >
                  Number should have 10 digit. you have{" "}
                  {num.current.value.length}
                </label>
              )}
            </div>

            <div className="buttonBox">
              <button className="save-btn" onClick={addNewContactHandler}>
                Save
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default NewContact;
