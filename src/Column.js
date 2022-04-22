import React from 'react';
import {NewText} from './NewText';

export function Column(props) {
  return (
    <div className='col-sm'>
    <div className="Column">
      <div className="Column__title">{props.title}</div>
      {props.children}
      <NewText onSubmit={props.addCard} placeholder="Add card..." />
    </div>
    </div>
  );
}
