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

  const calculateTotal = function(type) {
    let sum = 0;
    data.allItems[type].reduce((acc, curr) => {
      return sum = acc + curr.value;
    }, sum)
    // let sum = 0;
    // data.allItems[type].forEach((cur) => {
    //   sum =+ cur.value;
    // })
      
    data.totals[type] = sum;
  };

  const data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
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
    deleteItem: function(type, id) {
      
      let ids, index;
      ids = data.allItems[type].map(function(current) {
        return current.id;
      });
      index = ids.indexOf(id)
      
      if (index !== -1) {
        data.allItems[type].splice(index, 1);
        console.log(data.allItems)
      }
      
    },
    calculateBudget: function() {
      //calculate total income and expenses
      calculateTotal('exp');
      calculateTotal('inc');
      
      //calculate budget, inc minus exp
      data.budget = data.totals.inc - data.totals.exp;
      
      //calculate the % of income we have spent
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },
    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      }
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
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container'
  }
  
  return {
    getInput: function() {
      return {
        type: document.querySelector(domStrings.inputType).value, //inc or exp
        description: document.querySelector(domStrings.inputDescription).value,
        value: parseFloat(document.querySelector(domStrings.inputValue).value)
      };
    },
    addListItem: function(obj, type){
      let html, newHtml, element;
      //create html string with placeholder text
      if (type === "inc") {
        element = domStrings.incomeContainer;
        html = "<div class='item clearfix' id='inc-%id%'><div class='item__description'>%description%</div><div class='right clearfix'><div class='item__value'>%value%</div><div class='item__delete'><button class='item__delete--btn'><i class='fa fa-window-close-o'></i></button></div></div></div>";
      } else if (type === 'exp') {
        element = domStrings.expensesContainer;
        html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="fa fa-window-close-o"></i></button></div></div></div>';
      }
      //replace placeholder text with actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);

      //insert html into DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);  
    },
    deleteListItem: function(selectorId) {
      let el = document.getElementById(selectorId)
      document.getElementById(selectorId);
      el.parentNode.removeChild(el);

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
    displayBudget: function(obj) {
      document.querySelector(domStrings.budgetLabel).textContent = obj.budget;
      document.querySelector(domStrings.incomeLabel).textContent = obj.totalInc;
      document.querySelector(domStrings.expensesLabel).textContent = obj.totalExp;
      

      if (obj.percentage > 0) {
        document.querySelector(domStrings.percentageLabel).textContent = obj.percentage + '%';
      } else {
        document.querySelector(domStrings.percentageLabel).textContent = '---';
      }
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
    document.querySelector(dom.container).addEventListener('click', controlDeleteItem);
  })
  };  

  const updateBudget = () => {
    //calculate budget
    budgetController.calculateBudget();
    //return the budget
    const budget = budgetController.getBudget();

    //display budget
    uiController.displayBudget(budget);
  };

  const controlAddItem = () => {
    let input, newItem;
    //get input data
    input = uiController.getInput();    
    
    //making sure fields are not empty when adding data
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
     
      //add item to budget controller
      newItem = budgetController.addItem(input.type, input.description, input.value);
      //add item to ui
      uiController.addListItem(newItem, input.type);

      //clear fields
      uiController.clearFields();

      //calculate and update budget
      updateBudget();
    }
  };
  
  const controlDeleteItem = e => {
    let itemId, splitId, type, id;
    itemId = e.target.parentNode.parentNode.parentNode.parentNode.id;
    console.log(itemId)

    if (itemId) {
      
      splitId = itemId.split('-');
      type = splitId[0];
      id = parseInt(splitId[1]);
      // console.log(id)
      // console.log(type)

      // delete item from data structure
      budgetController.deleteItem(type, id);
      // delete item from ui
      uiController.deleteListItem(itemId);
      // update and show new budget
      updateBudget();
    }

  };
    
 
  return {
    init: function() {
      console.log('apps up');
      uiController.displayBudget({
        budget: '0',
        totalInc: '0',
        totalExp: '0',
        percentage: -1
      });
      setUpEventListeners();
    }
  }

})(budgetController, uiController);

controller.init();