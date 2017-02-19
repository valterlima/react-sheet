import React from 'react';
import SheetItemForm from './components/SheetItemForm.jsx';
import SheetItemValidation from './validations.jsx';
import SheetSummary from './components/SheetSummary.jsx';
import SheetList from './components/SheetList.jsx';

export default class Sheet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: {
        income: [],
        expense: []
      }
    }
  }

  loadData() {
    fetch("./data/data.json")
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({
          items: json
        });
      });
  }

  componentDidMount() {
    this.loadData();
  }

  handleNewItemSubmit(values) {

    var newItemsState = Object.assign({}, this.state.items);
    
    if (values.type == 'Income') {
      var newItem = {
        id: newItemsState.income.length + 1,
        description: values.description,
        amount: Number(values.amount)
      }
      newItemsState.income = newItemsState.income.concat(newItem);
    }
    else if (values.type == 'Expense'){
      var newItem = {
        id: newItemsState.expense.length + 1,
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

    return (
      <div className="container-fluid" >
        <h1 className="text-center">My sheet</h1>

        <SheetList items={this.state.items} onDelete={ (item, type) => this.handleItemDelete(item, type) } />
          
        <SheetSummary summary={summary} />
        
        <SheetItemForm onSubmit={(values) => this.handleNewItemSubmit(values)} />

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
