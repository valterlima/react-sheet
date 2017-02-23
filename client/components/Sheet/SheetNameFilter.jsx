import React from 'react';

export default class SheetNameFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: ""
    }
  }

  handleNameFilterChanged(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      description: value
    });

    this.props.onChange(value);
  }

  render() {
    return (
      <div className="form-group">
        <input className="form-control" type="text" placeholder="Filter description ..." 
        value={this.state.description} onChange={ (e) => this.handleNameFilterChanged(e) } />
      </div>
    )
  }
}