(function () {

  var view = function (ToDoList) {
    /*Model*/
    const ToDoListInst = new ToDoList;
    /*Model*/

    /*View*/

    var $ToDoListControls = null;
    var $ToDoListContent = null;

    /*framework*/
    function init() {
      $ToDoListControls = document.getElementsByClassName('ToDoList-controls');
      $ToDoListContent = document.getElementsByClassName('ToDoList-content');
    }

    function addEventListeners() {
      addControlsListeners();
      addContentsListeners();
    }

    function render() {

      var itemsFromModel = ToDoListInst.getAll();

      $ToDoListContent[0].innerHTML = '';

      for (let i = 0; i < itemsFromModel.length; i++) {
        const newTaskCard = document.createElement('li');

        const cardName = document.createElement('p');
        cardName.setAttribute('data-cardAction', 'name');
        cardName.className = itemsFromModel[i]._isDone ? 'crossedOut' : 'nonCrossedOut';
        cardName.innerHTML = itemsFromModel[i]._text;

        const cardIsDoneButton = document.createElement('input');
        cardIsDoneButton.type = "button";
        cardIsDoneButton.value = itemsFromModel[i]._isDone ? 'Mark as Undone' : 'Mark as Done';
        cardIsDoneButton.setAttribute('data-cardAction', 'isDone');

        const cardCheckedButton = document.createElement('input');
        cardCheckedButton.type = "checkbox";
        cardCheckedButton.checked = itemsFromModel[i]._isDone ? true : false;
        cardCheckedButton.setAttribute('data-cardAction', 'checkbox');

        const cardDeleteButton = document.createElement('input');
        cardDeleteButton.type = "button";
        cardDeleteButton.value = 'Delete Task';
        cardDeleteButton.setAttribute('data-cardAction', 'delete');

        const cardUpdateButton = document.createElement('input');
        cardUpdateButton.type = "button";
        cardUpdateButton.value = 'Update Task Name';
        cardUpdateButton.setAttribute('data-cardAction', 'updateName');

        newTaskCard.setAttribute('key', `${itemsFromModel[i]._id}`);
        newTaskCard.appendChild(cardCheckedButton);
        newTaskCard.appendChild(cardName);
        newTaskCard.appendChild(cardIsDoneButton);
        newTaskCard.appendChild(cardDeleteButton);
        newTaskCard.appendChild(cardUpdateButton);

        $ToDoListContent[0].appendChild(newTaskCard);
      }
    }
    /*framework*/


    function addControlsListeners() {
      for (var i = 0; i < $ToDoListControls.length; i++) {
        $ToDoListControls[i].addEventListener('click', function (event) {
          defineControlsEventForButton(event);
        });
      }
    }

    function addContentsListeners() {
      for (var i = 0; i < $ToDoListContent.length; i++) {
        $ToDoListContent[i].addEventListener('click', function (event) {
          defineContentsEventForButton(event);
        });
      }
    }

    function _findEventElement(event, dataAtributeName, dataAtributeValue) {

      const collectionItemElementsPseudo = event.target.parentElement.children; // get all item inner elements as pseudo array

      const collectionItemElements = Array.prototype.slice.call(collectionItemElementsPseudo); // convert pseudo array into array

      const needFullElement = collectionItemElements.find((item) => {
        return item.getAttribute(dataAtributeName) === dataAtributeValue
      });

      return needFullElement;
    }

    // handling ADD NEW TASK events
    function defineControlsEventForButton(event) {
      if (event.target.getAttribute('data-name') === 'add-button') {

        const addNameInput = _findEventElement(event, 'data-name', 'ToDoList-controls-add');

        ToDoListInst.create(addNameInput.value);

        addNameInput.value = '';

        render();
      }
    }


    // handling TASK ITEM events
    function defineContentsEventForButton(event) {

      const id = event.target.parentElement.getAttribute('key'); // define <li> id 

      if (event.target.getAttribute('data-cardAction') === 'delete') {

        ToDoListInst.delete(id);

        render();
      }

      if (event.target.getAttribute('data-cardAction') === 'isDone') {

        const newIsDoneStatus = event.target.value === 'Mark as Undone' ? false : true;

        ToDoListInst.updateModelIsDone(id, newIsDoneStatus);

        render();
      }

      if (event.target.getAttribute('data-cardAction') === 'checkbox') {

        const newIsDoneStatus = event.target.checked ? true : false;

        ToDoListInst.updateModelIsDone(id, newIsDoneStatus);

        render();
      }

      
      
      if (event.target.getAttribute('data-cardAction') === 'updateName') {

        const taskNameElement = _findEventElement(event, 'data-cardAction', 'name'); // find tag <p>

        const renametaskBlock = document.createElement('div');

        function saveCancelName(event) {
          if (event.target.getAttribute('data-cardAction') === 'save') {
            const taskNameElement = _findEventElement(event, 'data-cardAction', 'newText');
            ToDoListInst.updateModelText(id, taskNameElement.value);
            renametaskBlock.removeEventListener('click', saveCancelName);
            inputNewTaskName.removeEventListener('keydown', saveNameOnPressEnter);
            render();
          }

          if (event.target.getAttribute('data-cardAction') === 'cancel') {
            renametaskBlock.removeEventListener('click', saveCancelName);
            inputNewTaskName.removeEventListener('keydown', saveNameOnPressEnter);
            render();
          }

        }

        renametaskBlock.addEventListener('click', saveCancelName);

        const inputSaveTaskName = document.createElement('input'); // create input button for save name 
        inputSaveTaskName.type = "button";
        inputSaveTaskName.value = 'Save';
        inputSaveTaskName.setAttribute('data-cardAction', 'save');

        const inputCancelEnteringName = document.createElement('input'); // create input button for cancel 
        inputCancelEnteringName.type = "button";
        inputCancelEnteringName.value = 'Cancel';
        inputCancelEnteringName.setAttribute('data-cardAction', 'cancel');

        const inputNewTaskName = document.createElement('input'); // create input for name entering
        inputNewTaskName.type = "text";                           // set input type 'text'
        inputNewTaskName.value = taskNameElement.innerText;       // set inner text same as in tag <p>
        inputNewTaskName.setAttribute('data-cardAction', 'newText');

        function saveNameOnPressEnter(event) {                    // handler function to proccess key press
          if (event.target === inputNewTaskName && event.keyCode === 13) {

            ToDoListInst.updateModelText(id, event.target.value);
            inputNewTaskName.removeEventListener('keydown', saveNameOnPressEnter);
            renametaskBlock.removeEventListener('click', saveCancelName);
            render();
          }
        }
        inputNewTaskName.addEventListener('keydown', saveNameOnPressEnter); // set event listner on inputNewTaskName

        renametaskBlock.appendChild(inputNewTaskName);
        renametaskBlock.appendChild(inputSaveTaskName);
        renametaskBlock.appendChild(inputCancelEnteringName);

        event.target.parentElement.replaceChild(renametaskBlock, taskNameElement); // replace tag <p> on <input>

        //____________________________________________________________________________
        // realization on Prompt window

        // const oldTaskName = taskNameElement.innerText;

        // const newTaskName = prompt('Update your task name', oldTaskName);

        // if (newTaskName) {

        //   ToDoListInst.updateModelText(id, newTaskName);

        //   render();
        // };

      }

    }

    init();

    addEventListeners();

  };

  _module.exports = view;
})()
