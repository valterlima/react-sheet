import React from 'react';
import SheetItemForm from './Sheet/SheetItemForm.jsx';
import SheetSummary from './Sheet/SheetSummary.jsx';
import SheetList from './Sheet/SheetList.jsx';
import SheetPeriod from './Sheet/SheetPeriod.jsx';
import SheetNameFilter from './Sheet/SheetNameFilter.jsx';
import parseDate from './utils.js';

export default class Sheet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      yearFilter: [],
      monthFilter: [],
      descriptionFilter: ""
    }
  }

  loadData(callback) {
    fetch("./data/data2.json")
      .then(response => response.json())
      .then(json => {
        callback(json.items);
      })
  }

  componentWillMount() {
    this.loadData( (items) => {
      this.prepareToRender(items, true)
    });
  }

  prepareToRender(items, initial = false) {
    this.setState({
      items: items
    });
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

  getActiveItems() {
    let newItemsActive = this.state.items.filter( (item, i) => {
      let date = parseDate(item.date);
      let itemYear = date.getFullYear();
      let itemMonth = date.getMonth();
      let shouldDisplay = 
        this.state.yearFilter.indexOf(itemYear) >= 0 &&
        this.state.monthFilter.indexOf(itemMonth) >= 0 &&
        (this.state.descriptionFilter === "" || item.description.indexOf(this.state.descriptionFilter) >= 0);
      return shouldDisplay;
    })
    newItemsActive = newItemsActive.sort( (a,b) => b.date < a.date );
    return newItemsActive;
  }

  getFilterOptions(items) {
    let monthSet = new Set();
    let yearSet = new Set();
    items.map( (item) => {
      let date = parseDate(item.date);
      monthSet.add(date.getMonth());
      yearSet.add(date.getFullYear());
    })
    return {
      month: Array.from(monthSet).sort( (a,b) => b < a ),
      year: Array.from(yearSet).sort( (a,b) => b < a ),
    };
  }

  getFiltered(active, option, type) {
    let typeOptions;
    if (type === "month"){
      typeOptions = this.state.monthFilter.slice(0);
    }
    else if (type === "year"){
      typeOptions = this.state.yearFilter.slice(0);
    }
    if (active){
      typeOptions = typeOptions.concat(option);
    }
    else{
      typeOptions = typeOptions.filter( (item) => {
        return item !== option;
      })
    }
    typeOptions = typeOptions.sort( (a,b) => b < a );
    return typeOptions;
  }

  handlePeriodChanged(active, option, type) {
    let newFilter = this.getFiltered(active, option, type);
    
    if (type === "month"){
      this.setState({
        monthFilter: newFilter
      })
    }
    else if (type === "year"){
      this.setState({
        yearFilter: newFilter
      })
    }    
  }

  handleNameFilterChanged(description) {
    this.setState({
      descriptionFilter: description
    })
  }

  render() {
    let activeItems = this.getActiveItems();
    let options = this.getFilterOptions(this.state.items);

    return (
      <div>
        <h1 className="text-center">My sheet</h1>

        <SheetNameFilter onChange={ (e) => this.handleNameFilterChanged(e) } />

        <SheetPeriod 
          monthOptions={options.month} 
          yearOptions={options.year} 
          onClick={ (a,b,c) => this.handlePeriodChanged(a,b,c) } 
        />

        <SheetList items={activeItems} onDelete={ (item, type) => this.handleItemDelete(item, type) } />

        <SheetSummary items={activeItems} />  
        
        <SheetItemForm onSubmit={(values) => this.handleNewItemSubmit(values)} />

      </div>
    )
  }
}