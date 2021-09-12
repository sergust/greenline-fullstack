import React from "react";
import { Dropdown} from "react-bootstrap";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

const Icons = ({ setContent, content, theme }) => {
  return (
    <Dropdown
      style={{
        opacity: "1",
        zIndex: "10",
        filter: theme ? "invert(1)" : "invert(0)",
      }}
    >
      <Dropdown.Toggle
        className="position-relative px-1"
        id="dropdown-basic"
        role="button"
      >
        <span>😀</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Picker
          theme={theme ? "dark" : "light"}
          showSkinTones={true}
          showPreview={false}
          onSelect={(emoji) => setContent(content + emoji.native)}
          i18n={{
            search: "Search",
            clear: "Clear", // Accessible label on "clear" button
            notfound: "No Emoji Found",
            skintext: "Choose your default skin tone",
            categories: {
              search: "Search Results",
              recent: "Frequently Used",
              smileys: "Smileys & Emotion",
              people: "People & Body",
              nature: "Animals & Nature",
              foods: "Food & Drink",
              activity: "Activity",
              places: "Travel & Places",
              objects: "Objects",
              symbols: "Symbols",
              flags: "Flags",
              custom: "Custom",
            },
            categorieslabel: "Emoji categories", // Accessible title for the list of categories
            skintones: {
              1: "Default Skin Tone",
              2: "Light Skin Tone",
              3: "Medium-Light Skin Tone",
              4: "Medium Skin Tone",
              5: "Medium-Dark Skin Tone",
              6: "Dark Skin Tone",
            },
          }}
        />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Icons;
