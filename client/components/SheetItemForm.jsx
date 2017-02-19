import React from 'react';

export default class SheetItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      amount: "",
      type: "Income",
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit({
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
      <div>
        <h3>New item</h3>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div className="form-group">
            <input className="form-control" required type="text" name="description" value={this.state.description} onChange={(e) => this.handleInputChange(e)} placeholder="Description" />
          </div>
          <div className="form-group">
            <div className="input-group">
                <div className="input-group-addon">$</div>
              <input className="form-control" required min="0.01" type="number" name="amount" value={this.state.amount} onChange={(e) => this.handleInputChange(e)} placeholder="Amount" />
            </div>
          </div>
          <div className="form-group">
            <select className="form-control" name="type" value={this.state.type} onChange={(e) => this.handleInputChange(e)}>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      </div>
    )
  }
}

SheetItemForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
}