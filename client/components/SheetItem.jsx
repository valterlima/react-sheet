import React from 'react';
import SheetItemValidation from './../validations.jsx';

export default class SheetItem extends React.Component {
  constructor(props) {
    super(props);
  }

  onDelete(e){
    e.preventDefault();
    this.props.onDelete(this.props.value);
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-8">
          {this.props.value.description}
        </div>
        <div className="col-md-3 text-right">
          {this.props.value.amount}
        </div>
        <div className="col-md-1">
          <span className="glyphicon glyphicon-remove" aria-hidden="true" onClick={ (e) => this.onDelete(e) }></span>
        </div>
      </div>
    )    
  }
}

SheetItem.propTypes = {  
  item: React.PropTypes.shape({SheetItemValidation})
}