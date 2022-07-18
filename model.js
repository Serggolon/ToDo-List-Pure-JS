// const _module = require("./_module");

(function(){
  
  var ToDoList = (function(){

    class Model { // class Model with data model for todo item
  
      constructor(text) {
    
        this.isTextValid(text); // check if text parameter is not valid
    
        this._id = Math.floor(Math.random() * +new Date()) + ''; // id property is forming as unique value // uuidv4();
        this._isDone = false; // isDone property always false by default
        this._text = text; // text property is consuming from arguments 
    
        Object.defineProperty(this, '_id', { // define property set
          writable: false, // set writable is false for id property
          configurable: false // set configurable is false for id property
        });
      }
    
      isDoneValid(isDone) {
        if (typeof isDone !== 'boolean') {
          throw new Error('isDone parameter of the task isn\'t a boolean type');
        }
        return true;
      }
    
      isTextValid(text) {
        if (typeof text !== 'string') {
          throw new Error('Name of the task isn\'t a string type');
        }
        if (text.length === 0) {
          throw new Error('Name of the task doesn\'t contains any text');
        }
    
        return true;
      }
    }
    
    class ToDoList { // class ToDoList with store is forming from instance of Model class objects and methods for todo list 
    
      constructor() {
        this._store = []; // store with todo object models instance
      }
    
    
      create(text) {
        const instModel = new Model(text);//1) create new Model instance 
    
        this._update( instModel ); //2) call update method to write instModel into _store
    
        return instModel; // 3) return new object model
      }
    
      _update(model, index) {
        
        if (index !== undefined){
          this._store.splice(index, 0, model); // (on index, add=0/del>0, what we add) 
        } else {
          this._store.unshift(model); //write updated model into store
        }
        return this._store; // return updated store
      }
    
      _findCutModel(id) {
        const modelIndex = this._store.findIndex(elem => elem._id === id);//find index form store
        const targetModel = this._store.splice(modelIndex, 1); //cut object form store
    
        return [targetModel[0], modelIndex]; // return cutted by id object model from store 
      }
    
    
      updateModelText(id, text) {
        
        const [updatedModel, modelIndex] = this._findCutModel(id); //find and cut model obj form store
    
        updatedModel.isTextValid(text); // check if parameter valid
    
        updatedModel._text = text; // update model parameter text value
    
        this._update(updatedModel, modelIndex); // update store with updated model
    
        return updatedModel; // return udated model
      }
    
      updateModelIsDone(id, isDoneStatus) {
    
        const [updatedModel, modelIndex] = this._findCutModel(id); //find and cut model obj form store
        
        updatedModel.isDoneValid(isDoneStatus); // check if parameter valid
    
        updatedModel._isDone = isDoneStatus; // update model parameter isDone value
    
        this._update(updatedModel, modelIndex); // update store with updated model
    
        return updatedModel; // return udated model
      }
    
      delete(id) {
        return this._findCutModel(id); //find and cut model obj from store
      }
    
      getAll() {
        return this._store; // return store
      }
    }
  
    return ToDoList;
  
  }());
  
  //_module.exports ('ToDoList', ToDoList);
  _module.exports = ToDoList;

})()