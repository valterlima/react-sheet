import React from 'react';

export default class SheetSummary extends React.Component {
  render() {
    const balanceStyle = (this.props.summary.balance >= 0) ? 'green' : 'red';
    return (
      <div>
          <h3>Summary</h3>
        <div className="row">
          <div className="col-md-8">Total Income</div>
          <div className="col-md-3 text-right">{this.props.summary.total_income}</div>
        </div>
        <div className="row">
          <div className="col-md-8">Total Expense</div>
          <div className="col-md-3 text-right">{this.props.summary.total_expense}</div>
        </div>
        <div className="row">
          <div className="col-md-8">Balance</div>
          <div className="col-md-3 text-right" style={{color: balanceStyle}}>{this.props.summary.balance}</div>
        </div>
      </div>
    )
  }
}