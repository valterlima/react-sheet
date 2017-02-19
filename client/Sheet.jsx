import React from 'react';
import SheetItemForm from './components/SheetItemForm.jsx';
import SheetSummary from './components/SheetSummary.jsx';
import SheetList from './components/SheetList.jsx';

export default class Sheet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    }
  }

  loadData() {
    fetch("./data/data2.json")
      .then(response => response.json())
      .then(json => {
        this.setState({
          items: json.items
        });
      });
  }

  componentWillMount() {
    this.loadData();
  }

  handleNewItemSubmit(values) {

    values.item.id = this.state.items.length + 1;

    let newItemsState = this.state.items.concat(values.item).sort( (a,b) => { return b.date < a.date} );
    
    this.setState({
      items: newItemsState
    })

  }

  handleItemDelete(item) {
    this.setState({
      items: this.state.items.filter( (current, i) => {
        return current.id != item.id;
      })
    })
  }

  render() {

    return (
      <div className="container-fluid" >
        <h1 className="text-center">My sheet</h1>

        <SheetList items={this.state.items} onDelete={ (item, type) => this.handleItemDelete(item, type) } />

        <SheetSummary items={this.state.items} />  
        
        <SheetItemForm onSubmit={(values) => this.handleNewItemSubmit(values)} />

      </div>
    )
  }
}