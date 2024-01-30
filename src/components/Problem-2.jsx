// Problem2.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";

const Problem2 = () => {
  const [allContacts, setAllContacts] = useState([]);
  const [usContacts, setUSContacts] = useState([]);
  const [modalAVisible, setModalAVisible] = useState(false);
  const [modalBVisible, setModalBVisible] = useState(false);
  const [modalCVisible, setModalCVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [onlyEven, setOnlyEven] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageA, setPageA] = useState(1);
  const [pageB, setPageB] = useState(1);

 const fetchContacts = async (page, isUS = false) => {
   try {
     const response = await axios.get(
       `https://contact.mediusware.com/api/contacts/?page=${page}&search=United%20States`
     );

     const newContacts = response.data.results || [];
     isUS
       ? setUSContacts((prevContacts) => [...prevContacts, ...newContacts])
       : setAllContacts((prevContacts) => [...prevContacts, ...newContacts]);
   } catch (error) {
     console.error("Error fetching contacts:", error);
   }
 };


const loadMoreContacts = (isUS) => {
  isUS
    ? setPageB((prevPage) => prevPage + 1)
    : setPageA((prevPage) => prevPage + 1);

  fetchContacts(isUS ? pageB + 1 : pageA + 1, isUS);
};


 useEffect(() => {
   fetchContacts(pageA);
   fetchContacts(pageB, true);
 }, [pageA, pageB, searchTerm]);

 const openModalA = () => {
   setModalAVisible(true);
   setModalBVisible(false);
   setModalCVisible(false);
 };

 const openModalB = () => {
   setModalAVisible(false);
   setModalBVisible(true);
   setModalCVisible(false);
 };

 const openModalC = (contact) => {
   setModalAVisible(false);
   setModalBVisible(false);
   setModalCVisible(true);
   setSelectedContact(contact);
 };

 const closeModal = () => {
   setModalAVisible(false);
   setModalBVisible(false);
   setModalCVisible(false);
 };

 const handleSearchChange = (event) => {
   setSearchTerm(event.target.value);
 };

 const filteredContacts = (isUS) => {
   const contacts = isUS ? usContacts : allContacts;
   return contacts.filter(
     (contact) =>
    //  console.log('thsi is conatct',contact)
       contact.name &&
       contact.name.toLowerCase().includes(searchTerm.toLowerCase())
   );
 };


 const filterEvenContacts = (contacts) => {
   return onlyEven
     ? contacts.filter((contact) => contact.id % 2 === 0)
     : contacts;
 };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            style={{ backgroundColor: "#46139f" }}
            onClick={openModalA}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            style={{ backgroundColor: "#ff7f50" }}
            onClick={openModalB}
          >
            US Contacts
          </button>
        </div>
      </div>

      {modalAVisible && (
        <div className="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modal A</h5>
              </div>
              <div className="modal-body">
                {/* Contacts list */}
                <ul>
                  {filterEvenContacts(filteredContacts(false)).map(
                    (contact) => (
                      <li key={contact.id} onClick={() => openModalC(contact)}>
                        {contact.name}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="modal-footer">
                {/* Modal buttons */}
                <button className="btn btn-primary" onClick={openModalA}>
                  All Contacts
                </button>
                <button className="btn btn-warning" onClick={openModalB}>
                  US Contacts
                </button>
                <button className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
                {/* Checkbox for even IDs */}
                <input
                  type="checkbox"
                  onChange={() => setOnlyEven(!onlyEven)}
                  checked={onlyEven}
                />
                <label>Only even</label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal B */}
      {modalBVisible && (
        <div className="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modal B</h5>
              </div>
              <div className="modal-body">
                {/* Contacts list */}
                <ul>
                  {filterEvenContacts(filteredContacts(true)).map((contact) => (
                    <li key={contact.id} onClick={() => openModalC(contact)}>
                      {contact.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="modal-footer">
                {/* Modal buttons */}
                <button className="btn btn-primary" onClick={openModalA}>
                  All Contacts
                </button>
                <button className="btn btn-warning" onClick={openModalB}>
                  US Contacts
                </button>
                <button className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
                {/* Checkbox for even IDs */}
                <input
                  type="checkbox"
                  onChange={() => setOnlyEven(!onlyEven)}
                  checked={onlyEven}
                />
                <label>Only even</label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal C */}
      {modalCVisible && selectedContact && (
        <div className="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modal C - Contact Details</h5>
              </div>
              <div className="modal-body">
                {/* Contact details */}
                <p>ID: {selectedContact.id}</p>
                <p>Name: {selectedContact.name}</p>
                <p>Email: {selectedContact.email}</p>
              </div>
              <div className="modal-footer">
                
                <button className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Problem2;

