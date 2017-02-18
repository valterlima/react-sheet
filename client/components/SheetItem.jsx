import React from 'react';
import SheetItemValidation from './../validations.jsx';

export default class SheetItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.value.id,
      description: props.value.description,
      amount: props.value.amount,
      type: props.value.type
    }
  }

  render() {
    return (
      <div>
        {this.state.description + " ===> " + this.state.amount}
      </div>
    )    
  }
}

SheetItem.propTypes = {  
  item: React.PropTypes.shape({SheetItemValidation})
}