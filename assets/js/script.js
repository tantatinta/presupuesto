const budgetController = (() => {
  const Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  const Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  const data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };

  return {
    addItem: function(type, des, val) {
      let newItem;
      //create new id based on last item of either array
      if (data.allItems[type].length > 0) {
       ID = data.allItems[type][data.allItems[type].length - 1].id + 1; 
      } else {
        ID = 0;
      }
      

      //create new item based on type of expense or income
      if (type === 'exp') {
      newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }

      //push new item into corresponding array and return it
      data.allItems[type].push(newItem);
      return newItem;
    },
    testing: function() {
      console.log(data)
    }
  }
  
})();

const uiController = (() => {

  const domStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputAddBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list'
  }
  
  return {
    getInput: function() {
      return {
        type: document.querySelector(domStrings.inputType).value, //inc or exp
        description: document.querySelector(domStrings.inputDescription).value,
        value: document.querySelector(domStrings.inputValue).value
      };
    },
    addListItem: function(obj, type){
      let html, newHtml, element;
      //create html string with placeholder text
      if (type === "inc") {
        element = domStrings.incomeContainer;
        html = "<div class='item clearfix' id='income-%id%'><div class='item__description'>%description%</div><div class='right clearfix'><div class='item__value'>%value%</div><div class='item__delete'><button class='item__delete--btn'><i class='fa fa-window-close-o'></i></button></div></div></div>";
      } else if (type === 'exp') {
        element = domStrings.expensesContainer;
        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="fa fa-window-close-o"></i></button></div></div></div>';
      }
      //replace placeholder text with actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);

      //insert html into DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);  
    },
    clearFields: function() {
      let fields, fieldsArray;
      fields = document.querySelectorAll(domStrings.inputDescription + ', ' + domStrings.inputValue);
      fieldsArray = Array.prototype.slice.call(fields);

      fieldsArray.forEach((field, index, array) => {
        field.value = '';
      });
      fieldsArray[0].focus();
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
  };  

  const controlAddItem = () => {
    let input, newItem;
    //get input data
    input = uiController.getInput();    
    
    //add item to budget controller
    newItem = budgetController.addItem(input.type, input.description, input.value);
    //add item to ui
    uiController.addListItem(newItem, input.type);

    //clear fields
    uiController.clearFields();
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