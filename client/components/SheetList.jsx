import React from 'react';
import SheetListItem from './SheetListItem.jsx';

export default class SheetList extends React.Component {
  
  render() {
    
    const incomeItems = this.props.items.income.map((item, i) => {
      return ( 
        <SheetListItem 
          key={i} 
          value={item} 
          onDelete={ (item) => this.props.onDelete(item, "income") } /> 
      )
    });
    const expenseItems = this.props.items.expense.map((item, i) => {
      return ( 
        <SheetListItem 
          key={i} 
          value={item} 
          onDelete={ (item) => this.props.onDelete(item, "expense") } /> 
      )
    });

    return (
      <div>
        <div>
          <h3>Income</h3>
          {incomeItems}
        </div>
        <div>
          <h3>Expense</h3>
          {expenseItems}
        </div>
      </div>
    )
  }
}