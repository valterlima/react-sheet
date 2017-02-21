import React from 'react';
import SheetItemForm from './Sheet/SheetItemForm.jsx';
import SheetSummary from './Sheet/SheetSummary.jsx';
import SheetList from './Sheet/SheetList.jsx';
import SheetPeriod from './Sheet/SheetPeriod.jsx';
import parseDate from './utils.js';

export default class Sheet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      selectedPeriods: [],
      periodOptions: []
    }
  }

  loadData() {
    fetch("./data/data2.json")
      .then(response => response.json())
      .then(json => {
        this.prepareToRender(json.items, true);
      })
  }

  prepareToRender(items, initial = false) {
    let selectedPeriods;
    let periodOptions = this.getPeriodOptions(items);

    if (initial)
      selectedPeriods = periodOptions;
    else
      selectedPeriods = this.state.selectedPeriods;

    this.setState({
      items: items,
      periodOptions: periodOptions,
      selectedPeriods: selectedPeriods
    });
  }

  componentWillMount() {
    this.loadData();
  }

  handleNewItemSubmit(values) {
    values.item.id = this.state.items.length + 1;
    let newItemsState = this.state.items.concat(values.item).sort( (a,b) => { return b.date < a.date} );
    this.prepareToRender(newItemsState);
  }

  handleItemDelete(item) {
    let newItemsState = this.state.items.filter( (current, i) => {
      return current.id != item.id;
    })
    this.prepareToRender(newItemsState);
  }

  getPeriodOptions(items) {
    let optionsSet = new Set();
    items.map( (item) => {
      let date = parseDate(item.date);
      let month = date.getMonth()+1;
      if (month < 10) month = "0"+month;
      optionsSet.add( date.getFullYear() + '-' + month);
    })
    return Array.from(optionsSet).sort( (a,b) => b < a );
  }

  getActiveItems() {
    
    let newItemsActive = this.state.items.filter( (item, i) => {
      var itemPeriod = item.date.split('-',2).join('-');
      return this.state.selectedPeriods.indexOf(itemPeriod) >= 0
    })
    return newItemsActive;
  }

  handlePeriodChanged(active, option) {
    let selectedPeriods = this.state.selectedPeriods.slice(0);
    if (active){
      selectedPeriods = selectedPeriods.concat(option);
    }
    else{
      selectedPeriods = selectedPeriods.filter( (item) => {
        return item !== option;
      })
    }
    selectedPeriods = selectedPeriods.sort( (a,b) => b < a );

    this.setState({
      selectedPeriods: selectedPeriods
    })
  }

  render() {
    let itemsActive = this.getActiveItems();

    return (
      <div>
        <h1 className="text-center">My sheet</h1>

        <SheetPeriod options={this.state.periodOptions} onClick={ (a,b,c) => this.handlePeriodChanged(a,b,c) } />

        <SheetList items={itemsActive} onDelete={ (item, type) => this.handleItemDelete(item, type) } />

        <SheetSummary items={itemsActive} />  
        
        <SheetItemForm onSubmit={(values) => this.handleNewItemSubmit(values)} />

      </div>
    )
  }
}