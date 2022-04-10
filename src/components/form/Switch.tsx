import { ChangeEvent, ChangeEventHandler } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'
import { AppDispatch } from '../../redux/store'

interface Props {
    showArchived: ChangeEventHandler<HTMLInputElement>
}

function Switch({ showArchived }: Props) {
    return (
            <div className="form-check form-switch mt-3">
                <input className="form-check-input align-middle check-archived-switch" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={showArchived} />
                <label className="form-check-label align-middle ms-3" htmlFor="flexSwitchCheckDefault">Display archived notes</label>
            </div>
        )
}


const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        showArchived: () => dispatch(actions.toggleShowArchived()),
    }
}

export default connect(null, mapDispatchToProps)(Switch);