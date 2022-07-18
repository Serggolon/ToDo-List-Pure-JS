const instanceModule = require('./_module');

describe(`#Feature _module`, () => {
  describe(`#Scenario method 'exports'`, () => {

    describe(`#Scenario should save 'func' in the 'storeModule'`, () => {

      describe(`#Scenario Positive`, () => {
        it(`#When we call method 'exports' with valide arguments, 'functionName' has string type and 'func' has 'function' type
          and store has not function with name 'functionName' #Then add new object with func in the 'storeModule'`, () => {
          var moduleCountBefore = instanceModule.modulesCount();

          instanceModule.exports('test_exp_pos', function () { });
          
          var moduleCountAfter = instanceModule.modulesCount();
          
          expect((moduleCountBefore + 1) + '').toBe(moduleCountAfter + '');
        });
      });

      describe(`#Scenario Negative`, () => {
        it(`#When we call method 'exports' with not valide arguments #Then throw an error 'Wrong elements for module'`, () => {
          expect(function () {
            return instanceModule.exports(null, null);
          }).toThrow(new Error('Wrong elements for module'));
        });
      });

      describe(`#Scenario Negative`, () => {
        it(`#When we call method 'exports' with existed functionName  #Then throw an error "functionName already exists in the storeModule"`, () => {

          instanceModule.exports('test_exp_neg', function () { });

          expect(function () {
            return instanceModule.exports('test_exp_neg', function () { });
          }).toThrow(new Error('functionName already exists in the storeModule'));
        });
      });

    });

  });

  describe(`#Scenario method 'require'`, () => {

    describe(`#Scenario should return 'func' by name:'functionName' from the 'storeModule'`, () => {

      describe(`#Scenario Positive`, () => {
        it(`#When we call method 'require' with valide 'functionName' has string type and store has function with name 'functionName'
         #Then return func from the 'storeModule'`, () => {

          instanceModule.exports('test_req_pos', function () { });
          var res = typeof instanceModule.require('test_req_pos');
          
          expect(res).toBe('function');
        });
      });

      describe(`#Scenario Negative`, () => {
        it(`#When we call method 'require' with not valide 'functionName' has not string type 
        #Then throw an error "Wrong name type for required module"`, () => {
          
          expect(function () {
            return instanceModule.require(1212);
          }).toThrow(new Error('Wrong name type for required module'));
        });
      });

      describe(`#Scenario Negative`, () => {
        it(`#When we call method 'exports' with not existed functionName  #Then throw an error 'Module was not found'`, () => {

          expect(function () {
            return instanceModule.require('test_req_neg_notExiste');
          }).toThrow(new Error('Module was not found'));
        });
      });

    });

  });

});
