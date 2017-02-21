import React from 'react';
import SheetItemValidation from './validations.jsx';

export default class SheetListItem extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-3 col-sm-3 col-xs-3">
          {this.props.value.date}
        </div>
        <div className="col-md-6 col-sm-6 col-xs-6">
          {this.props.value.description}
        </div>
        <div className="col-md-2 col-sm-2 col-xs-2 text-right">
          {Number(this.props.value.amount).toFixed(2)}
        </div>
        <div className="col-md-1 col-sm-1 col-xs-1">
          <span className="glyphicon glyphicon-remove" aria-hidden="true" onClick={ () => this.props.onDelete(this.props.value) }></span>
        </div>
      </div>
    )    
  }
}

SheetListItem.propTypes = {  
  item: React.PropTypes.shape({SheetItemValidation}),
  onDelete: React.PropTypes.func.isRequired
}