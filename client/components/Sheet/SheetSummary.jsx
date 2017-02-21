import React from 'react';

export default class SheetSummary extends React.Component {
  
  calculateTotals() {
    const total_income = this.props.items.reduce( (sum, item) => {
      if (item.type == "income") 
        return sum + Number(item.amount)
      else 
        return sum;
    }, 0);
    const total_expense = this.props.items.reduce( (sum, item) => {
      if (item.type == "expense") 
        return sum + Number(item.amount)
      else 
        return sum;
    }, 0);
    const balance = (total_income - total_expense);

    return {
      total_income: Number(total_income).toFixed(2), 
      total_expense: Number(total_expense).toFixed(2), 
      balance: Number(balance).toFixed(2), 
    };
  }

  render() {
    let summary = this.calculateTotals();
    const balanceStyle = (summary.balance >= 0) ? 'green' : 'red';

    return (
      <section>
          <h3>Summary</h3>
        <div className="row">
          <div className="col-md-8 col-sm-8 col-xs-8">Total Income</div>
          <div className="col-md-3 col-sm-3 col-xs-3 text-right">{summary.total_income}</div>
        </div>
        <div className="row">
          <div className="col-md-8 col-sm-8 col-xs-8">Total Expense</div>
          <div className="col-md-3 col-sm-3 col-xs-3 text-right">{summary.total_expense}</div>
        </div>
        <div className="row">
          <div className="col-md-8 col-sm-8 col-xs-8">Balance</div>
          <div className="col-md-3 col-sm-3 col-xs-3 text-right" style={{color: balanceStyle}}>{summary.balance}</div>
        </div>
      </section>
    )
  }
}