var _module = (function () {

  // function Module() { // !!!!!!!! ES5 !!!!!!!! [{[moduleName]: func}, ...] ===> {[moduleName]: func, ...}
  //   // start of the constructor function
  //   Object.defineProperty(this, 'exports', {

  //     set: function (newFunction) {
        
  //       if (newFunction.name && typeof newFunction !== 'function') {
  //         throw new Error(`Type of newFunction is not a 'function' or anonymous function`)
  //       }

  //       if (!this[newFunction.name]) {
  //         this[newFunction.name] = newFunction;
  //       }
  //       else {
  //         throw new Error('moduleName already exists in the storeModule');
  //       }

  //     }
  //   });
  // } // end of the constructor function

  // Module.prototype.require = function (moduleName) {
  //   if (typeof moduleName !== 'string') {
  //     throw new Error('Wrong name type for required module')
  //   }

  //   if (this[moduleName]) {
  //     return this[moduleName];

  //   } else {

  //     throw new Error('Module was not found');
  //   }
  // };

  class Module { // !!!!!!!! ES6 !!!!!!!!

    constructor() {

      Object.defineProperty(this, 'exports', {

        set: function (newFunction) {
        
          if (typeof newFunction.name && typeof newFunction !== 'function') {
            throw new Error(`Type of newFunction is not a 'function' or anonymous function`)
          }

          if (!this[newFunction.name]) {
            this[newFunction.name] = newFunction;
          }
          else {
            throw new Error('moduleName already exists in the storeModule');
          }
        }
      });
    }

    require(moduleName) {
      if (typeof moduleName !== 'string') {
        throw new Error('Wrong name type for required module')
      }

      if (this[moduleName]) {
        return this[moduleName];

      } else {

        throw new Error('Module was not found');
      }
    };

  }

  return new Module;

}());

module.exports = _module; //export to spec.js