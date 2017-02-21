import React from 'react';

export default class SheetPeriodItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: true
    }
  }

  getMonthName(i) {
    const names = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return names[new Number(i-1)];
  }

  handleClick() {
    let newStatus = !this.state.active;
    this.setState({
      active: newStatus
    })

    this.props.onClick(newStatus, this.props.option);
  }

  render() {    
    let optionDisplay = this.getMonthName(this.props.option.split('-')[1]) + ' ' + this.props.option.split('-')[0]

    let classNames = "btn btn-default btn-small";
    (this.state.active) ? classNames += " active" : "";
    return (
      <button type="button" className={classNames} onClick={ () => this.handleClick() }>{optionDisplay}</button>
    )
  }
}

SheetPeriodItem.propTypes = {  
  option: React.PropTypes.string.isRequired
}