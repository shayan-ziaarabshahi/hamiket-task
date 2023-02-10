import React, { useState } from "react";
import styles from "./CustomSelect.module.css";




function CustomSelect({ listItems, currentValue, setCurrentValue }) {
  const [open, setOpen] = useState(false);

  const handleItemClick = (e, i) => {
    setCurrentValue(i)
    setOpen(false)
  }

  return (
    <div className={styles.customSelectContainer}>
      <div 
      onClick={() => setOpen(!open)}
      className={styles.customSelectInput}>
        <div className={styles.arrowIcon}>
          <i className="bi bi-caret-down"></i>
        </div>
        <span
        className={styles.customSelectInputValue}
        >{(currentValue && currentValue.title) || listItems[0].title}</span>
      </div>
      {open &&
        <div className={styles.customSelectListContainer}>
          <ul className={styles.customSelectList}>
            {listItems.map((i, index) => (
              <li key={index} onClick={(e) => handleItemClick(e, i)}>{i.title}</li>
            ))}
          </ul>
        </div>
      }
    </div>
  );
}

export default CustomSelect;
