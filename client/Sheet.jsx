import React from 'react';
import SheetItemForm from './components/SheetItemForm.jsx';
import SheetItem from './components/SheetItem.jsx';
import SheetItemValidation from './validations.jsx';
import SheetSummary from './components/SheetSummary.jsx';

export default class Sheet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: {
        income: props.items.income,
        expense: props.items.expense
      }
    }
  }

  handleNewItemSubmit(values) {

    var newItemsState = Object.assign({}, this.state.items);
    
    if (values.type == 'Income') {
      var newItem = {
        id: newItemsState.income.length++,
        description: values.description,
        amount: Number(values.amount)
      }
      newItemsState.income = newItemsState.income.concat(newItem);
    }
    else if (values.type == 'Expense'){
      var newItem = {
        id: newItemsState.expense.length++,
        description: values.description,
        amount: Number(values.amount)
      }
      newItemsState.expense = newItemsState.expense.concat(newItem);
    }

    this.setState({
      items: newItemsState
    })

  }

  handleItemDelete(item, type) {
    var newItemsState = Object.assign({}, this.state.items);

    if (type == 'income'){
      newItemsState.income = newItemsState.income.filter(function(current){
        return current.id != item.id;
      })
    }
    else if (type == 'expense'){
      newItemsState.expense = newItemsState.expense.filter(function(current){
        return current.id != item.id;
      });
    }

    this.setState({
      items: newItemsState
    })
  }

  calculateTotals() {
    const total_income = this.state.items.income.reduce( (sum, item) => sum + item.amount, 0);
    const total_expense = this.state.items.expense.reduce( (sum, item) => sum + item.amount, 0);
    const balance = (total_income - total_expense);

    return {total_income, total_expense, balance};
  }

  render() {

    var summary = this.calculateTotals();
    
    const incomeItems = this.state.items.income.map((item, i) => {
      return ( 
        <SheetItem 
          key={i} 
          value={item} 
          onDelete={ (item) => this.handleItemDelete(item, "income") } /> 
      )
    });
    const expenseItems = this.state.items.expense.map((item, i) => {
      return ( 
        <SheetItem 
          key={i} 
          value={item} 
          onDelete={ (item) => this.handleItemDelete(item, "expense") } /> 
      )
    });

    return (
      <div className="container-fluid" >
        <h1 className="text-center">My sheet</h1>
        <div>
          <h3>Income</h3>
          {incomeItems}
        </div>
        <div>
          <h3>Expense</h3>
          {expenseItems}
        </div>
        <div>
          <SheetSummary summary={summary} />
        </div>
        <div>
          <SheetItemForm onSubmit={(values) => this.handleNewItemSubmit(values)} />
        </div>        
      </div>
    )
  }
}

Sheet.propTypes = {
  items: React.PropTypes.shape({
    income: React.PropTypes.arrayOf(React.PropTypes.shape({SheetItemValidation})),
    expense: React.PropTypes.arrayOf(React.PropTypes.shape({SheetItemValidation})),
  })
}
