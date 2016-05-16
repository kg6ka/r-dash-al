import React, { PropTypes, Component } from 'react'
import styles from '../../AnomaliesList.scss'
import Reactable  from 'reactable';
 
var Table = Reactable.Table;


class AnomaliesTable extends Component {
    constructor(props) {
        super(props);


    }
    componentWillMount() {
        this.props.fetchAnomalies();
    }
    render() {
        const anomalies = this.props.anomalies;
        return (
            <div className={styles.anomalies}>
                <header>Anomalies</header>
            <Table className="table" data={anomalies} sortable={true} filterable={[
    {
        column: 'category',
        filterFunction: function(contents, filter) {
            // case-sensitive filtering
            return (contents.indexOf(filter) > -1);
        }
    },
     {
        column: 'vehicleId',
        filterFunction: function(contents, filter) {
            // case-sensitive filtering
            return (contents.indexOf(filter) > -1);
        }
    }
]}/>
                </div>
        );
    }
}


export default AnomaliesTable;