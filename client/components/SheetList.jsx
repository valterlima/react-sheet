import React from 'react';
import SheetListItem from './SheetListItem.jsx';
import SheetItemValidation from './../validations.jsx';

export default class SheetList extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      items: this.props.items
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.items != nextProps.items){
      this.setState({
        items: nextProps.items
      })
    }
  }

  render() {
    
    const incomeFilter = this.state.items.filter( (current, i) => {
      return current.type == "income"
    })

    const incomeItems = incomeFilter.map((item, i) => {
      return ( 
        <SheetListItem key={i} value={item} onDelete={ (item) => this.props.onDelete(item) } /> 
      )
    });

    const expenseFilter = this.state.items.filter( (current, i) => {
      return current.type == "expense"
    })

    const expenseItems = expenseFilter.map((item, i) => {
      return ( 
        <SheetListItem key={i} value={item} onDelete={ (item) => this.props.onDelete(item) } /> 
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

SheetList.propTypes = {
  onDelete: React.PropTypes.func.isRequired,
  items: React.PropTypes.arrayOf(React.PropTypes.shape({SheetItemValidation}).isRequired).isRequired
}