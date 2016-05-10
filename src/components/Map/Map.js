import { Map } from './components'
import { connect } from 'react-redux'


const mapStateToProps = (state) => {
    return {
        locations: state.map.locations,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchLocations: () => {
            dispatch({type: 'FETCH_LOCATIONS'})
        }
    }
}



const MapContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Map)

export default MapContainer

