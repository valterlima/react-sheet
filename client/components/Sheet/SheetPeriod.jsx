import React from 'react';
import SheetPeriodItem from './SheetPeriodItem.jsx';
import parseDate from './../utils.js';
import SheetItemValidation from './validations.jsx';

export default class SheetPeriod extends React.Component {
  
  constructor(props){
    super(props);
  }

  handlePeriodChanged(active, item) {
    this.props.onClick(active, item);
  }

  render() {

    let optionItems = this.props.options.map( (ele, i) => {
      return (
        <SheetPeriodItem key={i} option={ele} onClick={ (active, option) => this.handlePeriodChanged(active, option) } />
      )
    })

    return (
      <div>
        {optionItems}
      </div>
    )
  }
}

SheetPeriod.propTypes = {  
  options: React.PropTypes.arrayOf(React.PropTypes.string.isRequired).isRequired,
  onClick: React.PropTypes.func.isRequired
}