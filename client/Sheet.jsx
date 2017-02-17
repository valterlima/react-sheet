import React from 'react';
import SheetItemForm from './components/SheetItemForm.jsx';
import SheetItem from './components/SheetItem.jsx';
import itemValidation from './validations.jsx';

export default class Sheet extends React.Component {
  constructor(props) {
    super(props);

    var total_income = props.items.income.reduce( (sum, item) => sum + item.amount, 0);
    var total_expense = props.items.expense.reduce( (sum, item) => sum + item.amount, 0);

    this.state = {
      items: {
        income: props.items.income,
        expense: props.items.expense
      },
      total_income: total_income,
      total_expense: total_expense,
      balance: total_income - total_expense
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

    this.calculateTotals();

    this.setState({
      items: newItemsState
    })

  }

  calculateTotals() {
    const total_income = this.state.items.income.reduce( (sum, item) => sum + item.amount, 0);
    const total_expense = this.state.items.expense.reduce( (sum, item) => sum + item.amount, 0);
    this.setState({
      total_income: total_income,
      total_expense: total_expense,
      balance: total_income - total_expense 
    })
  }

  render() {
    
    const incomeItems = this.state.items.income.map(function(item, i) {
      return ( <SheetItem key={i} value={item} /> )
    });
    const expenseItems = this.state.items.expense.map(function(item, i) {
      return ( <SheetItem key={i} value={item} /> )
    });

    return (
      <div>My sheet
        <div>
          {incomeItems}
        </div> <br />
        <div>
          {expenseItems}
        </div> <br />
        <div>
          Total Income: {this.state.total_income} <br />
          Total Expense: {this.state.total_expense} <br />
        </div> <br />
        <div>
          <SheetItemForm onSubmit={(values) => this.handleNewItemSubmit(values)} />
        </div>        
      </div>
    )
  }
}

Sheet.propTypes = {
  items: React.PropTypes.shape({
    income: React.PropTypes.arrayOf(React.PropTypes.shape({itemValidation})),
    expense: React.PropTypes.arrayOf(React.PropTypes.shape({itemValidation})),
  })
}
