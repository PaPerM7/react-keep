import "./create-note.css";
import "../App.css";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Brush, Photo } from "@mui/icons-material";

function CreateNote({ setDetailState }) {
  return (
    <div className="create-bar" onClick={setDetailState}>
      <input className="searchbar-input" placeholder="Take a note..." />
      <div className="bar-icons">
        <div className="icon-container">
          <CheckBoxIcon className="checkbox" />
        </div>
        <div className="icon-container">
          <Brush className="checkbox" />
        </div>
        <div className="icon-container">
          <Photo className="checkbox" />
        </div>
      </div>
    </div>
  );
}

export default CreateNote;
