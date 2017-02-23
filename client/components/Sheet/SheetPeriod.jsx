import React from 'react';
import SheetPeriodItem from './SheetPeriodItem.jsx';
import parseDate from './../utils.js';
import SheetItemValidation from './validations.jsx';

export default class SheetPeriod extends React.Component {
  
  constructor(props){
    super(props);
  }

  render() {

    let yearItems = this.props.yearOptions.map( (ele, i) => {
      return (
        <SheetPeriodItem key={i} option={ele} type="year" onClick={ (active, option) => this.props.onClick(active, option, "year") } />
      )
    })
    let monthItems = this.props.monthOptions.map( (ele, i) => {
      return (
        <SheetPeriodItem key={i} option={ele} type="month" onClick={ (active, option) => this.props.onClick(active, option, "month") } />
      )
    })

    return (
      <div>
        {yearItems}
        <br />
        <br />
        {monthItems}
      </div>
    )
  }
}

SheetPeriod.propTypes = {  
  yearOptions: React.PropTypes.arrayOf(React.PropTypes.number.isRequired).isRequired,
  monthOptions: React.PropTypes.arrayOf(React.PropTypes.number.isRequired).isRequired,
  onClick: React.PropTypes.func.isRequired
}