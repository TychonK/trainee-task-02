import { connect } from 'react-redux'
import * as actions from '../../redux/actions'

function Form() {
    return (
            <div className="card text-dark bg-light mb-3">
                <div className="card-body">
                    <h5 className="card-title">Write a note</h5>
                    <div className="form-group">
                        <textarea id="addNote" className="form-control" aria-label="With textarea"></textarea> 
                        <p className="card-text mt-3 font-weight-bold">Select category</p>
                        <select className="form-select" id="selection">
                            <option value="null">Pick category</option>
                            <option value="task">Task</option>
                            <option value="idea">Idea</option>
                            <option value="random thought">Random thought</option>
                        </select>
                    </div>
                    <br />
                    <button id="addBtn" className="btn btn-primary">Add</button>
                    <div className="form-check form-switch mt-3">
                        <input className="form-check-input align-middle check-archived-switch" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                        <label className="form-check-label align-middle ms-3" htmlFor="flexSwitchCheckDefault">Display archived notes</label>
                    </div>
                </div>
            </div>
    )
}


export default Form;