import { useMemo } from "react";
import styles from "./App.module.css";
import Accordion from "./components/Accordion";
import transformTasks from "./helpers/transformTasks";

function App() {
  let accordionData = useMemo(transformTasks, []);

  return (
    <div className={styles.container}>
      <Accordion accordionItems={accordionData} />
    </div>
  );
}

export default App;
