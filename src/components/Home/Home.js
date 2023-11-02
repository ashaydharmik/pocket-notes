import React, { useState, useEffect } from "react";
import "./home.scss";
import bg from "../../assets/bg.png";
import lock from "../../assets/lock.png";
import Modal from "../Modal/Modal";
import arrow from "../../assets/Vector.png";
import enter from "../../assets/enter.png";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [groups, setGroups] = useState([]);
  const [selectedNoteName, setSelectedNoteName] = useState(null);
  const [isInNotesBox, setIsInNotesBox] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem("groups")) || [];
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];

    setGroups(storedGroups);
    setNotes(storedNotes);
  }, []);

  const closeModal = () => setShowModal(false);

  const createGroup = (notesName, selectedColor) => {
    const notesIcon = notesName.substring(0, 2).toUpperCase();
    const newGroup = {
      name: notesName,
      icon: notesIcon,
      backgroundColor: selectedColor,
    };
    setGroups([...groups, newGroup]);

    localStorage.setItem("groups", JSON.stringify([...groups, newGroup]));
  };

  const handleNoteName = (nameOfNote) => {
    setSelectedNoteName((prevSelectedNoteName) =>
      prevSelectedNoteName === nameOfNote ? null : nameOfNote
    );

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

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addNoteWithTimeDate(textareaValue);
      setTextareaValue("");
    }
  };

  const addNoteWithTimeDate = (noteText) => {
    const now = new Date();
    const day = now.getDate();
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(now);
    const year = now.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;
    const time = now.toLocaleTimeString();

    const newNote = {
      text: noteText,
      time: time,
      date: formattedDate,
    };

    setNotes([...notes, newNote]);
    localStorage.setItem("notes", JSON.stringify([...notes, newNote]));
  };

  const handleEnterImageClick = () => {
    addNoteWithTimeDate(textareaValue);
    setTextareaValue("");
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
              <div
                className="notes-details"
                key={index}
                style={{
                  backgroundColor: note.name === selectedNoteName ? "#F7ECDC" : "transparent",
                }}
              >
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
              {selectedNoteName &&
                groups.map((note, index) => {
                  if (note.name === selectedNoteName) {
                    return (
                      <>
                        <div key={index} className="note-header">
                          <p onClick={handleArrowClick}>
                            <img src={arrow} alt="" />
                          </p>
                          <div
                            className="icon"
                            style={{ backgroundColor: note.backgroundColor }}
                          >
                            <p>{note.icon}</p>
                          </div>
                          <h1>{note.name}</h1>
                        </div>
                        <div className="notes-written">
                          {notes.map((note, index) => (
                            <div key={index} className="notes-col">
                              <div className="time-date">
                                <p>{note.time}</p>
                                <p>{note.date}</p>
                              </div>
                              <div className="desc">
                                <p>{note.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="footer">
                          <textarea
                            placeholder="Enter your text here..."
                            value={textareaValue}
                            onChange={handleTextareaChange}
                            onKeyDown={handleEnterKeyPress}
                          ></textarea>
                          <img
                            src={enter}
                            alt=""
                            width="20px"
                            height="20px"
                            onClick={handleEnterImageClick}
                            style={{ cursor: "pointer" }}
                          />
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
