import './App.css';
import { useState } from 'react';
import Dropdown from './components/Dropdown/Dropdown';
import { positions, dropdowns, menuList, menuList2 } from './utils/dropdown';
import FeatherIcon from 'feather-icons-react';

function App() {

  return (
    <main className='main'>
      <Dropdown
        content={menuList}
        trigger={<FeatherIcon icon='share-2' strokeWidth='2' />}
      />
       {/* <Dropdown
        content={menuList2}
        trigger={<FeatherIcon icon='menu' strokeWidth='2' />}
      /> */}
    </main>
  );
}

export default App;
