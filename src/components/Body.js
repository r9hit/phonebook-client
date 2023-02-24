import React, { useEffect, useState } from "react";
import "./Body.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom/dist";
import { setedit } from "../redux/contactSlice";
import Loader from "./Loader";
import { axiosClient } from "../utils/axiosClient";

function Body() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [load, setload] = useState(false);

  const [contacts, setContacts] = useState([]);
  const [errormsg, seterror] = useState(false);

  async function getAllContact() {
    setload(true);
    try {
      const response = await axiosClient.get("/contacts");

      if (response.data?.length > 0) {
        setContacts(response.data);
      }
      seterror(false);
      setload(false);
    } catch (err) {
      console.log(err);
      setload(false);
      seterror(true);
    }
  }

  useEffect(() => {
    getAllContact();
  }, []);

  return (
    <>
      {load && <Loader />}
      <div className="mainbody">
        <div className="contact titleContact">
          <div>First name</div>
          <div>Last name</div>
          <div>Number</div>
          <div>Edit/View</div>
        </div>
        {errormsg && (
          <div className="err">
            "Some Error Occured ! Please Refresh or Wait"
          </div>
        )}
        {contacts?.map((contact, index) => {
          return (
            <div
              key={contact.id}
              className={index % 2 === 0 ? "contact" : "contact evenContact"}
            >
              <div>{contact.firstName}</div>
              <div>{contact.lastName}</div>
              <div>{contact.phone}</div>
              <div>
                <button
                  onClick={() => {
                    dispatch(setedit(contact));
                    navigate("/edit");
                  }}
                  className="editbutton"
                >
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Body;
