import tasks from "../data/tasks.js";
import Accordion from "../components/Accordion";

const transformedTasks = () => {
  let lastLevel = "";

  tasks.map((task) => (task.children = []));

  /* level 0 */
  let mainTasks = tasks.filter((task) => !task.parentId);
  mainTasks.forEach((i) => (i.level = 0));
  if (mainTasks.length > 0) lastLevel = 0;

  if (lastLevel === 0) {
    /* level 1 */
    mainTasks.forEach((mainTask) => {
      tasks.forEach((task) => {
        if (task.parentId === mainTask.id) {
          task.level = 1;
          mainTask.children.push(task);
          if (1 > lastLevel) lastLevel = 1;
        }
      });
    });
  }

  if (lastLevel === 1) {
    /* level 2 */
    mainTasks.forEach((mainTask) => {
      if (mainTask.children.length > 0) {
        mainTask.children.forEach((mainTaskChild) => {
          tasks.forEach((task) => {
            if (task.parentId === mainTaskChild.id) {
              task.level = 2;
              mainTaskChild.children.push(task);
              if (2 > lastLevel) lastLevel = 2;
            }
          });
        });
      }
    });
  }

  if (lastLevel === 2) {
    /* level 3 */
    mainTasks.forEach((mainTask) => {
      if (mainTask.children.length > 0) {
        mainTask.children.forEach((mainTaskChild) => {
          if (mainTaskChild.children.length > 0) {
            mainTaskChild.children.forEach((mainTaskChildChild) => {
              tasks.forEach((task) => {
                if (task.parentId === mainTaskChildChild.id) {
                  task.level = 3;
                  mainTaskChildChild.children.push(task);
                  if (3 > lastLevel) lastLevel = 3;
                }
              });
            });
          }
        });
      }
    });
  }

  if (lastLevel === 3) {
    /* level 4 */
    mainTasks.forEach((mainTask) => {
      if (mainTask.children.length > 0) {
        mainTask.children.forEach((mainTaskChild) => {
          if (mainTaskChild.children.length > 0) {
            mainTaskChild.children.forEach((mainTaskChildChild) => {
              if (mainTaskChildChild.children.length > 0) {
                mainTaskChildChild.children.forEach(
                  (mainTaskChildChildChild) => {
                    tasks.forEach((task) => {
                      if (task.parentId === mainTaskChildChildChild.id) {
                        task.level = 4;
                        mainTaskChildChildChild.children.push(task);
                        if (4 > lastLevel) lastLevel = 4;
                      }
                    });
                  }
                );
              }
            });
          }
        });
      }
    });
  }

  /* add accordion items*/

  if (lastLevel > 3) {
    /* level 3 */
    mainTasks.forEach((mainTask) => {
      if (mainTask.children.length > 0) {
        mainTask.children.forEach((mainTaskChild) => {
          if (mainTaskChild.children.length > 0) {
            mainTaskChild.children.forEach((mainTaskChildChild) => {
              if (mainTaskChildChild.children.length > 0) {
                mainTaskChildChild.content = (
                  <Accordion accordionItems={mainTaskChildChild.children} />
                );
              }
            });
          }
        });
      }
    });
  }

  if (lastLevel > 2) {
    /* level 2 */
    mainTasks.forEach((mainTask) => {
      if (mainTask.children.length > 0) {
        mainTask.children.forEach((mainTaskChild) => {
          if (mainTaskChild.children.length > 0) {
            mainTaskChild.content = (
              <Accordion accordionItems={mainTaskChild.children} />
            );
          }
        });
      }
    });
  }

  if (lastLevel > 1) {
    /* level 1 */
    mainTasks.forEach((mainTask) => {
      if (mainTask.children.length > 0) {
        mainTask.content = <Accordion accordionItems={mainTask.children} />;
      }
    });
  }

  return mainTasks;
};

export default transformedTasks;