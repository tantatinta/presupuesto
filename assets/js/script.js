const budgetController = (() => {
  
})();

const uiController = (() => {
  
})()

//global app controller
const controller = ((budgetCtrl, uiCtrl)=> {

  const controlAddItem = () => {
    console.log("inside ctrl add")
    //get input data
    
    //add item to budget controller

    //add item to ui

    //calculate budget

    //display budget
  }

  document.querySelector('.add__btn').addEventListener('click', controlAddItem);

  document.addEventListener('keypress', (event) => {
    if(event.keyCode === 13 || event.which === 13) {
      controlAddItem();
    }    
  })


})(budgetController, uiController)