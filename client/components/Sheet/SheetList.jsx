import React from 'react';
import SheetListItem from './SheetListItem.jsx';
import SheetItemValidation from './validations.jsx';

export default class SheetList extends React.Component {
  
  render() {
    
    const incomeFilter = this.props.items.filter( (current, i) => {
      return current.type == "income"
    })

    let incomeItems = incomeFilter.map((item, i) => {
      return ( 
        <SheetListItem key={i} value={item} onDelete={ (item) => this.props.onDelete(item) } /> 
      )
    });
    if (incomeItems.length == 0){
      incomeItems = "No income within this period"
    }

    const expenseFilter = this.props.items.filter( (current, i) => {
      return current.type == "expense"
    })

    let expenseItems = expenseFilter.map((item, i) => {
      return ( 
        <SheetListItem key={i} value={item} onDelete={ (item) => this.props.onDelete(item) } /> 
      )
    });
    if (expenseItems.length == 0){
      expenseItems = "No expenses within this period"
    }

    return (
      <section>
        <div>
          <h3>Income</h3>
          {incomeItems}
        </div>
        <div>
          <h3>Expense</h3>
          {expenseItems}
        </div>
      </section>
    )
  }
}

SheetList.propTypes = {
  onDelete: React.PropTypes.func.isRequired,
  items: React.PropTypes.arrayOf(React.PropTypes.shape({SheetItemValidation}).isRequired).isRequired
}