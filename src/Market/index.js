import React, { useEffect, useState } from 'react';
import api from '../api';

import { CustomSelect } from './CustomSelect';
import { Loader } from '../Loader';

import './Market.scss';
import { List } from './List';

const Market = ({show, click}) => {
  const[ loader, setLoader ] = useState(false);
  const[ items, setItems ] = useState([]);
  const[ selectedItems, setSelectedItems ] = useState(JSON.parse(localStorage.getItem('selectedItems')) || []);
  const[ priceList, setPriceList ] = useState([]);

  useEffect(() => {
    setLoader(true);
    fetch(api.all_items)
      .then(data => data.json())
      .then(({data}) => {
        setItems(data.item_list);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  useEffect(fetchPrices, [selectedItems]);

  function fetchPrices() {
    setLoader(true);
    fetch(`${api.prices}?body=${encodeURI(JSON.stringify(selectedItems))}`)
      .then(data => data.json())
      .then(({data}) => setPriceList(data))
      .finally(() => {
        setLoader(false);
      });
  }

  const addSelectedItem = (name) => {
    let items = [...selectedItems];

    items.push(name);
    items = [...new Set(items)];
    setSelectedItems(items);
    localStorage.setItem('selectedItems', JSON.stringify(items));
    click(false);
  }

  const deleteSelectedItem = (name) => {
    let items = [...selectedItems];

    items = items.filter(item => item !== name);
    setSelectedItems(items);
    localStorage.setItem('selectedItems', JSON.stringify(items));
  }

  const handleFocus = () => {
    click(true);
  }

  return (
    <div className="market">
      <div className="container">
        <div className="market__wrapper">
          <h2 className="market__title">
            Market
          </h2>

          {
            loader && <Loader />
          }

          <CustomSelect
            itemsList={items} 
            addSelectedItem={addSelectedItem} 
            handleFocus={handleFocus}
            show={show} />

            <div className="btns">
              <button
                className="remove btn"
                onClick={() => {
                  setSelectedItems([]);
                  localStorage.setItem('selectedItems', JSON.stringify([]));
                }}
                disabled={!selectedItems.length}
              >
                Remove list
              </button>

              <button 
                className="reload btn"
                onClick={fetchPrices}
              >
                Reload
              </button>
            </div>

          <List list={priceList} deleteSelectedItem={deleteSelectedItem} />
        </div>
      </div>
    </div>
  )
}

export default Market;