import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Accordion.module.css";

const AccordionItem = ({ item, expanded, setExpanded, accordionStyle }) => {
  const isOpen = item.id === expanded;
  return (
    <div id={item.id} className={styles.container}>
      <motion.header
        initial={false}
        animate={{
          backgroundColor: isOpen
            ? accordionStyle.openedHeaderBackgroundColor
            : accordionStyle.closedHeaderBackgroundColor,
        }}
        onClick={() => setExpanded(isOpen ? false : item.id)}
        className={styles.header}
      />
      <div className={styles.headerContent}>
        <div className={styles.headerContentLeft}>
          {[...Array(item.level).keys()].map((x) => (
            <span key={x + 1} className={styles.levelLine}></span>
          ))}
        </div>
        <div className={styles.headerContentRight}>
          <div className={styles.headerContentRightTop}>
            <span>{item.title}</span>
            <span
              className={`${styles.arrowIcon} ${
                isOpen ? styles.rotateArrow : ""
              }`}
            >
              <i className="bi bi-caret-down-fill"></i>
            </span>
          </div>
          <di className={styles.headerContentRightBottom}>
            {item.description}
          </di>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className={styles.section}
          >
            <motion.div
              variants={{
                collapsed: { scale: 0.5 },
                open: { scale: 1 },
              }}
              transition={{ duration: 0.8 }}
              className={styles.dataContainer}
            >
              {item.content}
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

const Accordion = ({ accordionItems }) => {
  console.log(accordionItems);

  const [expanded, setExpanded] = useState(0);

  const accordionStyle = {
    openedHeaderBackgroundColor: "beige",
    closedHeaderBackgroundColor: "white",
  };

  return accordionItems.map((item) => (
    <AccordionItem
      key={item.id}
      item={item}
      expanded={expanded}
      setExpanded={setExpanded}
      accordionStyle={accordionStyle}
    />
  ));
};

export default React.memo(Accordion);