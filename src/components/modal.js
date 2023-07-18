import {
  Apps,
  ArchiveOutlined,
  MoreVertOutlined,
  PersonAddAltOutlined,
  PhotoOutlined,
} from "@mui/icons-material";
import "./modal.css";
import { Button } from "@mui/material";

function Modal({ close, card, updateValue, archiveCard }) {
  function closeModal(event) {
    if (event.target === event.currentTarget) {
      close();
    }
  }

  return (
    <div className="whole-page" onClick={(event) => closeModal(event)}>
      <div className="modal-card">
        <div className="modal-header">
          <textarea
            className="title"
            value={card.title}
            onInput={(event) =>
              updateValue({ ...card, title: event.target.value })
            }
          />
        </div>
        <textarea
          className="note-content"
          placeholder="Say something, im giving up on you..."
          value={card.description}
          onInput={(event) =>
            updateValue({ ...card, description: event.target.value })
          }
        />
        <div className="modal-footer">
          <div className="modal-icons">
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
          </div>
          <Button
            variant="outlined"
            className="close-btn"
            onClick={() => close()}
          >
            close
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
