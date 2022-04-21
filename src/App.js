import React, { Component } from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import _ from "lodash";
import { Board } from "./Board";

let _columnId = 0;
let _cardId = 0;

// const initialCards = Array.from({ length: 9 }).map(() => ({
//   id: ++_cardId,
//   title: `Card ${_cardId}`
// }));

// const initialCards = [
//   {id: 1, title: 'Helpdesk Call AA999'},
//  {id: 2, title: 'Helpdesk Call BB999'},
//  {id: 3, title: 'Helpdesk Call CC999'},
//  {id: 4, title: 'Helpdesk Call EE999'},
//  {id: 5, title: 'Helpdesk Call DD999'},
// {id: 6, title: 'Helpdesk Call FF999'},
//  {id: 7, title: 'Helpdesk Call GG999'},

// ]

const initialCards = Array.from({ length: 7 }).map(() => ({
  id: ++_cardId,
  title: `Card ${_cardId}`
}));


const initialColumns = ["To do", "Development", "Testing","Done"].map((title, i) => (
  {
  id: _columnId++,
  title,
  cardIds: initialCards.slice(i * 3, i * 3 + 3).map((card) => card.id),
  
}),);

// const initialColumns = ["To Do", "Development", "Testing","Done"].map((title, i) => ({
//   id: _columnId++,
//   title,
//   cardIds: initialCards.slice(i * 3, i * 3 + 3).map((card) => card.id)
// }));

// const initialColumns = [
//   {id: 1, title: 'To Do', cardIds: [1,2]},
//   {id: 2, title: 'Development', cardIds: [3,4]},
//   {id: 3, title: 'Testing', cardIds: [5]},
//   {id: 4, title: 'Done', cardIds: [6,7]},
// ]

class App extends Component {
  state = {
    cards: initialCards,
    columns: initialColumns,
    searchText: "",
    searchStatus:"All"
  };

  addColumn = (_title) => {
    const title = _title.trim();
    if (!title) return;

    const newColumn = {
      id: ++_columnId,
      title,
      cardIds: []
    };
    this.setState((state) => ({
      columns: [...state.columns, newColumn]
    }));
  };

  addCard = (columnId, _title) => {
    const title = _title.trim();
    if (!title) return;

    const newCard = { id: ++_cardId, title };
    this.setState((state) => ({
      cards: [...state.cards, newCard],
      columns: state.columns.map((column) =>
        column.id === columnId
          ? { ...column, cardIds: [...column.cardIds, newCard.id] }
          : column
      )
    }));
  };

  moveCard = (cardId, destColumnId, index) => {
    this.setState((state) => ({
      columns: state.columns.map((column) => ({
        ...column,
        cardIds: _.flowRight(
          // 2) If this is the destination column, insert the cardId.
          (ids) =>
            column.id === destColumnId
              ? [...ids.slice(0, index), cardId, ...ids.slice(index)]
              : ids,
          // 1) Remove the cardId for all columns
          (ids) => ids.filter((id) => id !== cardId)
        )(column.cardIds)
      }))
    }));
  };

  nameSearch = (e) => {
     this.setState(() => ({
      ...this.state,
      searchText: e.target.value.toLowerCase()
    }));
  };

  statusSearchHandler = (e)=>{
    // console.log(e.target.value);
    this.setState(() => ({
      ...this.state,
      searchStatus: e.target.value
    }));
  }

  render() {
    return (
     
      <div>
      
      <div className="search-input-div">
        <span className="heading">Kanban Board</span>

        <input placeholder="Search Card"  onChange={this.nameSearch}  className="search-input" type='text'  />
       

            <select class="classic" value={this.state.searchStatus} onChange={this.statusSearchHandler}>
            <option>All</option>
            <option>To do</option>
            <option>Development</option>
            <option>Testing</option>
            <option>Done</option>
</select>
     
      </div>
        
      
        
        <Board
          cards={this.state.cards}
          columns={this.state.columns}
          moveCard={this.moveCard}
          addCard={this.addCard}
          // addColumn={this.addColumn}
          searchText={this.state.searchText}
          allowedColums={this.state.searchStatus}
        />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
