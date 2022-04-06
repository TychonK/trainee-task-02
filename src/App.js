import { connect } from 'react-redux'

import './App.scss';

import Cards from './components/cards/Cards';
import Form from './components/form/Form';
import Table from './components/table/Table';
import Modal from './components/modal/Modal';
import ArchivedCards from './components/cards/ArchivedCards'


function App({ modalData, showArchived }) {

  return (
    <div className="App container my-3">
      {modalData.isOpen && <Modal />}
      <Form />
      <hr />
      <ul className="row container-fluid">
        {showArchived ? <ArchivedCards /> : <Cards />}
      </ul>
      <hr />
      <Table />
    </div>
  );
}

const mapStateToProps = state => {
    return {
      modalData: state.modal,
      showArchived: state.showArchived
    }
}

export default connect(mapStateToProps)(App);
