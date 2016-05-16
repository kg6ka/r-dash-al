import { AnomaliesTable } from './components'
import { connect } from 'react-redux'

// import './fixed-data-table-style.min.css'

const mapStateToProps = (state) => {
    return state.anomaliesList
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchAnomalies: () => {
            dispatch({type: 'FETCH_ANOMALIES'})
        }
    }
}



const AnomaliesList = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnomaliesTable)

export default AnomaliesList

