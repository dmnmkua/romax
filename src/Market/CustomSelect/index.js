import React, { useState } from 'react';

import './CustomSelect.scss';

export const CustomSelect = ({itemsList, addSelectedItem, handleFocus, show}) => {

  const[ searchItem, setSearchItem ] = useState('');

  return(
    <div className="select">
      <input
        type="text" 
        className="select__input"
        onFocus={handleFocus}
        onChange={ev => setSearchItem(ev.target.value)}
        value={searchItem}
        placeholder='Select item' />

      {
        show &&
        <ul className="select__list">
          {
            itemsList
              .filter(item => item.display_name.toLowerCase().indexOf(searchItem.toLowerCase()) !== -1)
              .sort((a, b) => a.display_name > b.display_name ? 1 : -1)
              .map(item => (
                <li
                  className="select__item"
                  key={item.name}
                  onClick={() => {
                    addSelectedItem(item.name);
                    setSearchItem('');
                  }}
                >
                  {item.display_name}
                </li>
              ))
          }
        </ul>
      }
    </div>
  )
}