import React from 'react';
import {TextForm} from './TextForm';

export function Column(props) {
  return (
    <div className='col-md-3'>
    <div className="Column">
      <div className="Column__title">{props.title}</div>
      {props.children}
      <TextForm onSubmit={props.addCard} placeholder="Add card..." />
    </div>
    </div>
  );
}
