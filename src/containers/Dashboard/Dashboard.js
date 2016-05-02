import React, { Component } from 'react';
import { HeaderSite, CarsStatus, Anomalies, FleetActivity, Categories, Heatmap, Target } from 'components';
import styles from './Dashboard.scss';
import cx from 'classnames';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: Math.random(),
    };
  }

  componentDidMount() {
    window.setInterval(() => {
      this.setState({
        percent: Math.random(),
      });
    }, 2000);
  }

  render() {
    return (
      <div>
        <HeaderSite/>
        <div className={cx(styles.backgroundGradient, styles.fleetStatus)}>
          <CarsStatus
            registeredCars={'35,203'}
            percentRegistered={12}
            active={Math.random() * 100}
            uptodate={Math.random() * 100}
            updateData={'13.01.16'}
          />
          <Anomalies
            anomalies={310}
            cars1={90}
            percent={10}
            percentRight={Math.random() * 100}
            unblocked={100}
            cars2={89}
            blocked={210}
            cars3={5}
          />
        </div>
        <div className={styles.fleetStatus}>
          <div className={cx(styles.backgroundGradient, styles.fleetActivity)}>
            <FleetActivity />
          </div>
          <div className={styles.fleetActivity}>
            <Categories />
          </div>
          <Target />
        </div>
      </div>
    );
  }
}





//       <x-layout className={styles.backgroundGradient}>
//         <div className="side-right col-20">
//            side-right
//         </div>
//         <div className="side-left col-80">
//           <div className="side-left col-100 blue-shadow">
//             <CarsStatus
//               registeredCars={'35,203'}
//               percentRegistered={12}
//               active={Math.random() * 100}
//               uptodate={Math.random() * 100}
//               updateData={'13.01.16'}
//             />
//             <Anomalies
//               anomalies={310}
//               cars1={90}
//               percent={10}
//               percentRight={Math.random() * 100}
//               unblocked={100}
//               cars2={89}
//               blocked={210}
//               cars3={5}
//             />
//           </div>
//           <div className="side-right col-20">
//              side-right
//           </div>
//           <div className="side-left col-80">
//             <div className="side-left col-100 blue-shadow">
//             </div>
//             <div className="side-right col-50">
//                side-right
//             </div>
//             <div className="side-left col-50">
//             </div>
//           </div>
//         </div>
//       </x-layout>