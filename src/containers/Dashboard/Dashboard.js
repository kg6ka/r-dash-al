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
        <div className={styles.layout}>
          <div className={cx(styles.layoutSideRight,styles.layoutCol20)}>
             <img src="/assets/images/3.jpg"/>
          </div>
          <div className={cx(styles.layoutSideLeft,styles.layoutCol80)}>
            <div className={cx(styles.backgroundGradient, styles.fleetStatus)}>
              <CarsStatus
                registeredCars={argusComponents.fleetStatus.registered}
                percentRegistered={12}
                active={argusComponents.fleetStatus.activity}
                uptodate={argusComponents.fleetStatus.updated}
                updateData={'13.01.16'}
              />
              <Anomalies
                anomalies={argusComponents.totalAnomalies.total_sum}
                cars1={argusComponents.totalAnomalies.cars1}
                percent={argusComponents.totalAnomalies.blocked_percent}
                percentRight={argusComponents.totalAnomalies.suspicious_percent}
                unblocked={argusComponents.totalAnomalies.suspicious_sum}
                cars2={argusComponents.totalAnomalies.cars2}
                blocked={argusComponents.totalAnomalies.blocked_sum}
                cars3={argusComponents.totalAnomalies.cars3}
              />
            </div>
            <div className={cx(styles.layoutSideRight,styles.layoutCol25)}>
              <Target />
              <img src="/assets/images/2.jpg"/>
            </div>
            <div className={styles.fleetStatus,styles.layoutSideLeft,styles.layoutCol75}>
              <div className={cx(styles.backgroundGradient, styles.fleetActivity)}>
                <FleetActivity />
              </div>
              <div className={cx(styles.fleetActivity,styles.layoutCol50)}>
                <Categories />
              </div>
              <div className={styles.layoutCol50}>
                 <img src="/assets/images/1.jpg"/>
              </div>
            </div>
          </div>
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