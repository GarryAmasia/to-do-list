const taskList = [];
const badList = [];

const hourLimitation = 168;

const handleOnSubmit = (event) => {
  const formData = new FormData(event);
  //   console.log(event);
  const task = formData.get("task");
  const hour = Number(formData.get("hour"));
  //   console.log(task, hour);

  if (hour < 1) return alert(" 0 is not allowed here");

  const ttlHrs = taskList.reduce((accumulator, currentValue) => {
    return (accumulator += currentValue.hour);
  }, 0);
  if (hourLimitation < ttlHrs + hour) {
    return alert("you dont have enough hours to add up");
  }

  //adding hour and task into object
  const newTask = {
    task: task,
    hour: hour,
  };

  taskList.push(newTask);
  console.log(taskList);
  displayTask();
  totalTaskHours();
};

// console.log(taskList);

//second way of doing(for line no.3 - no.9)
// const handleOnSubmit = () => {
//   const task = document.querySelector(".task-class").value;
//   const hour = document.querySelector(".hour-class").value;
//   console.log(task, hour);
// };

const displayTask = () => {
  let string = "";
  const element = document.getElementById("task-list");

  taskList.map((item1, i) => {
    string += `
      <li>
                            <div class="items">
                                <span class="item">
                                    <input type="checkbox">
                                    <label for="">${item1.task}</label>
                                </span>
                                <span class="hour">${item1.hour} hour/week</span>
                                <button onclick = "markAsNotToDo(${i})">markNTD</button>
                                <button onclick = "deleteItem(${i})">delete</button>
                            </div>
                        </li>
      `;
  });
  element.innerHTML = string;
};

const displayBadTaskList = () => {
  let string = "";
  const element = document.getElementById("bad-list");

  badList.map((item1, i) => {
    string += `
        <li>
                              <div class="items">
                                  <span class="item">
                                      <input type="checkbox">
                                      <label for="">${item1.task}</label>
                                  </span>
                                  <span class="hour">${item1.hour} hour/week</span>
                                  <button onclick = "markAsToDo(${i})">markTD</button>
                                  <button onclick = "deleteItem(${i})">delete</button>
                              </div>
                          </li>
        `;
  });
  element.innerHTML = string;
  totalBadTaskHours();
};

//0.attach onclick button on mark not to do button
//1.define array
//2.take item from task array to bad array
//3.loop through the bad array and create li string
//4.grab the bad listing ul and pass the string from num.3 as innerHTML

//0.attach onclick button on mark not to do button
//1.define array
//2.take item from task array to bad array
//to take the item only from the array we need to pass [0]
//we need to display the content again after splice method executed(array without the item that has been spliced)
const markAsNotToDo = (index) => {
  //   debugger;
  // const value = taskList[index]
  //   alert(taskList[index]);
  //   console.log(index);
  const itm = taskList.splice(index, 1)[0];
  console.log(itm, taskList);
  badList.push(itm);
  displayTask();
  displayBadTaskList();
  totalTaskHours();
};

const markAsToDo = (index) => {
  const itm = badList.splice(index, 1)[0];
  console.log(itm, taskList);
  taskList.push(itm);
  displayTask();
  displayBadTaskList();
  totalTaskHours();
};

const totalTaskHours = () => {
  const ttlHrs = taskList.reduce((accumulator, currentValue) => {
    return (accumulator += currentValue.hour);
  }, 0);

  document.getElementById("totalhours").innerText = ttlHrs;
};

const totalBadTaskHours = () => {
  const ttlHrs = badList.reduce((accumulator, currentValue) => {
    return (accumulator += currentValue.hour);
  }, 0);

  document.getElementById("totalbadhours").innerText = ttlHrs;
};

//to delete item from the list
const deleteItem = (param) => {
  const deletedValue = taskList.splice(param, 1)[0];
  displayTask();
  totalTaskHours();
  alert(deletedValue.task + "has been deleted");
};
