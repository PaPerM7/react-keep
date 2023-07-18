import "./App.css";
import CreateNote from "./components/create-note";
import "./components/show-cards.css";
import Modal from "./components/modal.js";
import NavBar from "./components/navBar.js";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AppsIcon from "@mui/icons-material/Apps";
import {
  Apps,
  ArchiveOutlined,
  CheckCircle,
  MoreVertOutlined,
  PersonAddAltOutlined,
  PhotoOutlined,
  Refresh,
  Settings,
  ViewStream,
} from "@mui/icons-material";
import NoteDetail from "./components/note-detail.js";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [isNewNote, SetIsNewNote] = useState(false);
  const [clickedNote, SetclickedNote] = useState({});
  const [isModalOpen, SetIsModalOpen] = useState(false);
  const [isArchived, SetIsArchived] = useState(false);
  const [cardsList, SetCardsList] = useState([
    // {
    //   id: 0,
    //   title: "Shopping List",
    //   note: "I have to buy new clothes for my son i should not forget that ",
    // },
    // {
    //   id: 1,
    //   title: "Math Exam",
    //   note: "math exam should be on june 3rd 2015",
    // },
  ]);

  async function fetchNotes() {
    const result = await axios.get(`http://localhost:3000/notes`);
    console.log("result: ", result);
    SetCardsList([...result.data]);
  }

  useEffect(() => {
    fetchNotes();
    console.log("cardsList", cardsList);
  }, []);

  // create a fuction

  function openDetail() {
    SetIsNewNote(true);
  }
  function closeDetail() {
    SetIsNewNote(false);
  }
  function createCard(title, note) {
    if (note !== "" || title !== "") {
      let card = { title: title, description: note };
      SetCardsList([...cardsList, card]);
      axios.post("http://localhost:3000/note", {
        ...card,
      });
    }
  }
  function updateList(updatedNote) {
    const newList = cardsList.map((card) => {
      if (card.id === updatedNote.id) {
        return updatedNote;
      }
      return card;
    });
    SetclickedNote(updatedNote);
    SetCardsList([...newList]);
    axios.put("http://localhost:3000/note", {
      ...updatedNote,
    });
  }

  function openModal(card) {
    SetIsModalOpen(true);
    SetclickedNote(card);
  }
  function CloseModal() {
    SetIsModalOpen(false);
  }

  function archiveCard(event, selectedCard) {
    event.stopPropagation();
    let newList = cardsList.filter(function (card) {
      return card !== selectedCard;
    });
    SetCardsList([...newList]);
    SetIsModalOpen(false);
    console.log("selectedCard:", selectedCard);
    axios.delete(`http://localhost:3000/note/${selectedCard.id}`);
  }

  return (
    <div className="App">
      <div className="header">
        <div className="collapsable">
          <div className="icon-container">
            <MenuIcon className="icon" />
          </div>
          <div className="logo">
            <img className="logo-img" src="keep.png" alt="keep logo" />
            <span className="keep-text">Keep</span>
          </div>
        </div>
        <div className="searchbar-container">
          <div className="input-container">
            <span className="searchbar-icon">
              <SearchIcon className="icon" />
            </span>
            <input className="searchbar-input" placeholder="Search" />
          </div>
        </div>
        <div className="tools">
          <div className="tools-icons">
            <div className="icon-container">
              <Refresh className="icon" />
            </div>
            <div className="icon-container">
              <ViewStream className="icon" />
            </div>
            <div className="icon-container">
              <Settings className="icon" />
            </div>
          </div>
        </div>
        <div className="profile">
          <div className="icon-container">
            <AppsIcon className="icon" />
          </div>
          <img
            className="profile-pic"
            src="mmr with black mask"
            alt="profile"
          />
        </div>
      </div>
      <div className="main-page">
        <NavBar />
        <div className="content">
          {isNewNote ? (
            <NoteDetail
              setDetailState={closeDetail}
              cardCreateor={createCard}
            />
          ) : (
            <CreateNote setDetailState={openDetail} />
          )}
          <div className="cards-container">
            {cardsList.map((card) => (
              <div className="card" onClick={() => openModal(card)}>
                <span className="card-title">{card.title}</span>
                <span className="card-note">{card.description}</span>
                <div className="card-icons">
                  <div className="icon-container">
                    <Apps className="icon" />
                  </div>
                  <div className="icon-container">
                    <ArchiveOutlined
                      className="icon"
                      onClick={(event) => archiveCard(event, card)}
                    />
                  </div>
                  <div className="icon-container">
                    <PersonAddAltOutlined className="icon" />
                  </div>
                  <div className="icon-container">
                    <PhotoOutlined className="icon" />
                  </div>
                  <div className="icon-container">
                    <MoreVertOutlined className="icon" />
                  </div>
                  <div className="icon-container">
                    <CheckCircle className="icon edge-icon" />
                  </div>
                </div>
              </div>
            ))}
            {isModalOpen ? (
              <Modal
                close={CloseModal}
                card={clickedNote}
                updateValue={updateList}
                archiveCard={archiveCard}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
