import React from 'react';

export default class SheetItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      amount: "",
      type: "income",
      date: ""
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit({
      item: this.state
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
      <section>
        <h3>New item</h3>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div className="form-group">
            <input className="form-control" required type="text" name="description" value={this.state.description} onChange={(e) => this.handleInputChange(e)} placeholder="Description" />
          </div>
          <div className="form-group">
            <div className="input-group">
                <div className="input-group-addon">$</div>
              <input className="form-control" required min="0.01" step="0.01" type="number" name="amount" value={this.state.amount} onChange={(e) => this.handleInputChange(e)} placeholder="Amount" />
            </div>
          </div>
          <div className="form-group">
            <input id="datee" className="form-control" required type="date" name="date" selected={this.state.date} onChange={(e) => this.handleInputChange(e) } />
          </div>
          <div className="form-group">
            <select className="form-control" name="type" value={this.state.type} onChange={(e) => this.handleInputChange(e)}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      </section>
    )
  }
}

SheetItemForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
}