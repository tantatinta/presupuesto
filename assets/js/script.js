const budgetController = (() => {
  
})();

const uiController = (() => {

  const domStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputAddBtn: '.add__btn'
  }
  
  return {
    getInput: function() {
      return {
        type: document.querySelector(domStrings.inputType).value, //inc or exp
        description: document.querySelector(domStrings.inputDescription).value,
        value:document.querySelector(domStrings.inputValue).value
      };
    },
    getDOMStrings: function() {
      return domStrings;
    }
      
  }

})()

//global app controller
const controller = ((budgetCtrl, uiCtrl)=> {

  const setUpEventListeners = () => {
    const dom = uiController.getDOMStrings();
    document.querySelector(dom.inputAddBtn).addEventListener('click', controlAddItem);
    document.addEventListener('keypress', (event) => {
      if(event.keyCode === 13 || event.which === 13) {
        controlAddItem();
      }
  })
  }

  

  const controlAddItem = () => {
    
    //get input data
    const input = uiController.getInput();
    console.log(input);
    
    //add item to budget controller

    //add item to ui

    //calculate budget

    //display budget
  }

  
  return {
    init: function() {
      console.log('apps up');
      setUpEventListeners();
    }
  }

})(budgetController, uiController);

controller.init();