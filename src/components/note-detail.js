import {
  Apps,
  MoreVertOutlined,
  PersonAddAltOutlined,
  PhotoOutlined,
  PushPin,
} from "@mui/icons-material";
import "./note-detail.css";
import { Button } from "@mui/material";
import { useState } from "react";

function NoteDetail({ setDetailState, cardCreateor }) {
  const [title, SetTitle] = useState("");
  const [note, SetNote] = useState("");

  return (
    <div className="new-card-container">
      <div className="new-card-header">
        <textarea
          className="new-card-title"
          placeholder="Title"
          onInput={(event) => {
            SetTitle(event.target.value);
          }}
        ></textarea>
        <div className="icon-container">
          <PushPin className="checkbox" />
        </div>
      </div>
      <textarea
        className="new-card-content"
        placeholder="Take a note..."
        onInput={(event) => {
          SetNote(event.target.value);
        }}
        autoFocus
      ></textarea>

      <div className="new-card-footer">
        <div className="new-card-icons">
          <div className="icon-container">
            <Apps className="icon" />
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
            <PhotoOutlined className="icon" />
          </div>{" "}
          <div className="icon-container">
            <PhotoOutlined className="icon" />
          </div>{" "}
          <div className="icon-container">
            <PhotoOutlined className="icon" />
          </div>{" "}
          <div className="icon-container">
            <PhotoOutlined className="icon" />
          </div>
        </div>
        <Button
          variant="outlined"
          className="close-btn"
          onClick={(event) => {
            setDetailState();
            cardCreateor(title, note);
          }}
        >
          close
        </Button>
      </div>
    </div>
  );
}

export default NoteDetail;
