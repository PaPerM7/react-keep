import { useState } from "react";
import "./show-cards.css";
import "./modal.js";
import Modal from "./modal.js";
import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";
import {
  Apps,
  ArchiveOutlined,
  CheckCircle,
  MoreVertOutlined,
  PersonAddAltOutlined,
  PhotoOutlined,
} from "@mui/icons-material";

function ShowCards() {
  const [clickedNote, SetclickedNote] = useState({});
  const [isModalOpen, SetIsModalOpen] = useState(false);
  const [isArchived, SetIsArchived] = useState(false);
  const [cardsList, SetCardsList] = useState([
    {
      id: 0,
      title: "Shopping List",
      note: "I have to buy new clothes for my son i should not forget that ",
    },
    {
      id: 1,
      title: "Math Exam",
      note: "math exam should be on june 3rd 2015",
    },
  ]);

  function updateList(updatedNote) {
    const newList = cardsList.map((card) => {
      if (card.id === updatedNote.id) {
        return updatedNote;
      }
      return card;
    });
    SetclickedNote(updatedNote);
    SetCardsList([...newList]);
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
  }

  return (
    <div className="cards-container">
      {cardsList.map((card) => (
        <div className="card" onClick={() => openModal(card)}>
          <span className="card-title">{card.title}</span>
          <span className="card-note">{card.note}</span>
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
  );
}

export default ShowCards;
