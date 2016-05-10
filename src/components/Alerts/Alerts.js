import { AlertsList } from './components'
import { connect } from 'react-redux'


const mapStateToProps = (state) => {
    return {
        alerts: state.alerts.alerts,
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



const VisibleAlertsList = connect(
    mapStateToProps,
    mapDispatchToProps
)(AlertsList)

export default VisibleAlertsList

