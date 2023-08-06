import './App.css';
import Dropdown from './components/Dropdown/Dropdown';
import { menuList, menuList2, menuList3, menuList4 } from './utils/dropdown';
import FeatherIcon from 'feather-icons-react';

function App() {
  return (
    <main className='main'>
      <div className='container'>
        <Dropdown
          id='share'
          content={menuList}
          trigger={<FeatherIcon icon='share-2' strokeWidth='2' />}
        />
        <Dropdown
          id='menu'
          content={menuList2}
          trigger={<FeatherIcon icon='menu' strokeWidth='2' />}
        />
      </div>
      <div className='container'>
        <Dropdown
          id='settings'
          content={menuList3}
          trigger={<FeatherIcon icon='arrow-down' strokeWidth='2' />}
        />
        <Dropdown
          id='folders'
          content={menuList4}
          trigger={<FeatherIcon icon='grid' strokeWidth='2' />}
        />
      </div>
    </main>
  );
}

export default App;
