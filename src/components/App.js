import styles from './App.module.css'
import MainAccordion from './components/MainAccordion'
import transformedTasks from './data/transformedTasks';



function App() {

  let accordionItems = transformedTasks();
  

  return (
    <div className={styles.container}>
      <MainAccordion accordionItems={accordionItems}/>
    </div>
  );
}

export default App;
