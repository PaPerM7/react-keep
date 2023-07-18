import { useState } from "react";
import "./navBar.css";
import Icon from "@mui/material/Icon";

function NavBar() {
  const [itemList, setItemList] = useState([
    { title: "Notes", iconName: "lightbulb", id: 1, isActive: true },
    {
      title: "Reminders",
      iconName: "notifications",
      id: 2,
      isActive: false,
    },
    { title: "Edit Labels", iconName: "edit", id: 3, isActive: false },
    { title: "Archive", iconName: "archive", id: 4, isActive: false },
    { title: "Trash", iconName: "delete", id: 5, isActive: false },
  ]);

  function activeItem(item) {
    for (const object of itemList) {
      if (object === item) {
        object.isActive = true;
      } else {
        object.isActive = false;
      }
    }
    setItemList([...itemList]);
  }

  return (
    <div className="navbar">
      {itemList.map((item) => (
        <div
          className={item.isActive ? "active item" : "item"}
          key={item.id}
          onClick={() => activeItem(item)}
        >
          <Icon className="item-icon">{item.iconName}</Icon>
          <span>{item.title}</span>
        </div>
      ))}
    </div>
  );
}

export default NavBar;
