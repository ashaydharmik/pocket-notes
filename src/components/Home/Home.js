import React, { useState, useEffect } from "react";
import "./home.scss";
import bg from "../../assets/bg.png";
import lock from "../../assets/lock.png";
import Modal from "../Modal/Modal";
import arrow from "../../assets/Vector.png";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [groups, setGroups] = useState([]);
  const [selectedNoteName, setSelectedNoteName] = useState(null);
  const [isInNotesBox, setIsInNotesBox] = useState(false);

  const closeModal = () => setShowModal(false);

  const createGroup = (notesName, selectedColor) => {
    const notesIcon = notesName.substring(0, 2).toUpperCase();
    const newGroup = {
      name: notesName,
      icon: notesIcon,
      backgroundColor: selectedColor,
    };
    setGroups([...groups, newGroup]);
  };

  const handleNoteName = (nameOfNote) => {
    setSelectedNoteName(nameOfNote);
    setIsInNotesBox(true);

    if (window.innerWidth < 768) {
      document.querySelector(".menu").classList.add("menu-hidden-mobile");
      document.querySelector(".notes-box").classList.add("notes-box-visible-mobile");
    } else {
      document.querySelector(".menu").classList.remove("menu-hidden-mobile");
      document.querySelector(".notes-box").classList.remove("notes-box-visible-mobile");
    }
  };

  const handleArrowClick = () => {
    setIsInNotesBox(false);
    if (window.innerWidth < 768) {
      document.querySelector(".menu").classList.remove("menu-hidden-mobile");
    }
  };

  return (
    <>
      <div className="container">
        <div className="menu ">
          <div className="heading">
            <h1>Pocket Notes</h1>
          </div>
          <button className="add" onClick={() => setShowModal(true)}>
            <p id="symbol">+</p>
            <p id="para">Create Notes group</p>
          </button>
          {showModal && (
            <Modal closeModal={closeModal} createGroup={createGroup} />
          )}
          <div className="notes">
            {groups.map((note, index) => (
              <div className="notes-details" key={index}>
                <div
                  className="icon"
                  style={{ backgroundColor: note.backgroundColor }}
                >
                  <p>{note.icon}</p>
                </div>
                <div className="name">
                  <p onClick={() => handleNoteName(note.name)}>{note.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="notes-box">
          {isInNotesBox ? (
            <div className="notebox-heading">
              {selectedNoteName && groups.map((note, index) => {
                if (note.name === selectedNoteName) {
                  return (
                    <>
                    <div key={index} className="note-header">
                      <p onClick={handleArrowClick}><img src={arrow} alt=""/></p>
                      <div className="icon" style={{ backgroundColor: note.backgroundColor }}>
                        <p>{note.icon}</p>
                      </div>
                      <h1>{note.name}</h1>
                    </div>
                    <div className="notes-written">
                        <div className="time-date">
                          <p>10:10 AM</p>
                          <p>9 March 2023</p>
                        </div>
                        <div className="desc">
                          <p>Another productive way to use this tool to begin a daily writing routine. One way is to generate a random paragraph with the intention to try to rewrite it while still keeping the original meaning. The purpose here is to just get the writing started so that when the writer goes onto their day's writing projects, words are already flowing from their fingers.</p>
                        </div>
                    </div>
                    </>
                  );
                }
                return null;
              })}
            </div>
          ) : (
            <div className="content">
              <div className="center-content">
                <img src={bg} alt=""></img>
                <h2>Pocket Notes</h2>
                <p>
                  Send and receive messages without keeping your phone online.
                  Use Pocket Notes on up to 4 linked devices and 1 mobile phone
                </p>
              </div>
              <div className="bottom-content">
                <p>
                  <img src={lock} alt=""></img> end-to-end encrypted
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
