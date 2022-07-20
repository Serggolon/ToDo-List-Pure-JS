var _module = (function () {

  var storeModule = [];

  function _module() {

    return {

      exports: function (moduleName, func) {

        if (typeof moduleName !== 'string' && typeof func !== 'function') {
          throw new Error('Wrong elements for module')
        }

        var isExist = !!storeModule.find(function (item) {

          return Object.keys(item)[0] === moduleName
        });

        if (!isExist) {
          storeModule.push({
            [moduleName]: func
          })
        } else {
          throw new Error('moduleName already exists in the storeModule');
        }
      },

      require: function (moduleName) {
        if (typeof moduleName !== 'string') {
          throw new Error('Wrong name type for required module')
        }

        var returnModul = storeModule.find(function (item) {
          return Object.keys(item)[0] === moduleName
        });


        if (returnModul) {
          return returnModul[moduleName];

        } else {

          throw new Error('Module was not found');
        }
      },

      modulesCount: function () { return storeModule.length; },

      getAll: function () { return storeModule; },
    }
  }

  // GLOBAL OBJECT REQUIRE
  return _module();

}());

module.exports = _module; //export to spec.js