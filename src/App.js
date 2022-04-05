import './App.scss';

import Cards from './components/cards/Cards';
import Form from './components/form/Form';
import Table from './components/table/Table';


function App() {
  return (
    <div className="App container my-3">
      <Form />
      <hr />
      <ul className="row container-fluid">
        <Cards />
      </ul>
      <hr />
      <Table />
    </div>
  );
}


export default App;
