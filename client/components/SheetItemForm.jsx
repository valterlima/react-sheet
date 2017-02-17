import React from 'react';

export default class SheetItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      amount: "",
      type: "Income",
    }

    this.onSubmit = this.props.onSubmit;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.onSubmit({
      description: this.state.description,
      amount: this.state.amount,
      type: this.state.type
    })
  }
  
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <input type="text" name="description" value={this.state.description} onChange={(e) => this.handleInputChange(e)} placeholder="Description" />
        <input type="number" name="amount" value={this.state.amount} onChange={(e) => this.handleInputChange(e)} placeholder="Amount" />
        <select name="type" value={this.state.type} onChange={(e) => this.handleInputChange(e)}>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

NewItemForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
}