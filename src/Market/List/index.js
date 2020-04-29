import React from 'react';

import './List.scss';

export const List  = ({list, deleteSelectedItem}) => {
  function stringView(num) {
    return num ? new Intl.NumberFormat().format(Number(num)) : 'n/a';
  }

  return(
    <div className="list">
      <div className="item item--header">
        <div className="name">
          Name
        </div>
        <div className="pcs">
          Pcs
        </div>
        <div className="price">
          Price
        </div>
      </div>
      { list.length
        ? list.map(item => (
          <div key={item.item_name} className="item">
            <div className="name">
              {item.item_name}
            </div>
            <div className="pcs">
              <span className="mob">Pcs: </span>{stringView(item.data.volume)}
            </div>
            <div className="price">
              <span className="mob">Price: </span>{ stringView(item.data.price) }
            </div>
            <div className="btn--delete">
              <button className="btn--delete" onClick={() => deleteSelectedItem(item.item_name)}>
                <span className="material-icons">
                  delete
                </span>
              </button>
            </div>
          </div>
        ))
        : <div className="empty">Not items</div>
      }
    </div>
  )
}