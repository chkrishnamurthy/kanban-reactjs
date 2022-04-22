import React from "react";
import { Column } from "./Column";
import { DraggableCard } from "./Card";

export function Board({
  cards,
  columns,
  moveCard,
  addCard,
  addColumn,
  searchText = "",
  allowedColums = "All"
}) {
  return (
    <div className="Board">
      {columns
        .filter(
          (c) => allowedColums === "All" || c.title.includes(allowedColums)
        )
        .map((column) => (
          <Column
            key={column.id}
            title={column.title}
            addCard={addCard.bind(null, column.id)}
          >
            {/* {console.log( column.id)} */}
            {column.cardIds
              .map((cardId) => cards.find((card) => card.id === cardId))
              .filter((c) => c.title.toLowerCase().includes(searchText))
              .map((card, index) => (
                <DraggableCard
                  key={card.id}
                  id={card.id}
                  columnId={column.id}
                  columnIndex={index}
                  title={card.title}
                  moveCard={moveCard}
                />
              ))}
            {column.cardIds.length === 0 && (
              <DraggableCard
                isSpacer
                moveCard={(cardId) => moveCard(cardId, column.id, 0)}
              />
            )}
          </Column>
        ))}
     
    </div>
  );
}
