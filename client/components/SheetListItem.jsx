import React from 'react';
import SheetItemValidation from './../validations.jsx';

export default class SheetListItem extends React.Component {
  constructor(props) {
    super(props);
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
          <span className="glyphicon glyphicon-remove" aria-hidden="true" onClick={ () => this.props.onDelete(this.props.value) }></span>
        </div>
      </div>
    )    
  }
}

SheetListItem.propTypes = {  
  item: React.PropTypes.shape({SheetItemValidation})
}