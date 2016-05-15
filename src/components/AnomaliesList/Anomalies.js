import { AnomaliesList } from './components'
import { connect } from 'react-redux'



const mapStateToProps = (state) => {
    return {
        anomalies: state.anomalies.anomalies,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchAlerts: () => {
            dispatch({type: 'FETCH_ALERTS'})
        },
        onResolveClick: (id) => {
            dispatch({
                type: 'DELETE_ALERT',
                id
            })
        }
    }
}



const AnomaliesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnomaliesList)

export default AnomaliesContainer

