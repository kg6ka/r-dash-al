import React, { Component } from 'react';
import { HeaderSite, CarsStatus, Anomalies, FleetActivity, Categories, Heatmap, Target, VisibleAlertsList, Map } from 'components';
import styles from './Dashboard.scss';
import cx from 'classnames';
import map from './images/map.jpeg';
import car from './images/vw_polo.jpeg';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: Math.random(),
      alertsVisibility: false
    };
  }

  componentDidMount() {
    window.setInterval(() => {
      this.setState({
        percent: Math.random(1),
      });
    }, 5000);

  }
  changeAlertsVisibilty =() => {
    this.setState({
      alertsVisibility: !this.state.alertsVisibility
    });
  }

  render() {

    return (
      <div>
        <HeaderSite onClick={this.changeAlertsVisibilty}/>
        <div className={styles.layout}>
          <div className={cx(styles.layoutSideRight,styles.layoutCol20,this.state.alertsVisibility? styles.notActive: '')}>

            <VisibleAlertsList onClick={this.changeAlertsVisibilty}/>
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
            </div>
            <div className={styles.fleetStatus,styles.layoutSideLeft,styles.layoutCol75}>
              <div className={cx(styles.backgroundGradient, styles.fleetActivity)}>
                <FleetActivity />
              </div>
              <div className={cx(styles.fleetActivity,styles.layoutCol50)}>
                <Categories />
              </div>
              <div className={styles.layoutCol50}>
                 <Map lat={48.856614} lng={2.3522219} />
              </div>
            </div>
          </div>
        </div>
      </div>
       ); 
  }  
}


 
//       <div className={styles.fleetBlock}>
//         <div className={styles.fleetInlineBlock}>
//           <div className={cx(styles.backgroundGradient, styles.fleetStatus)}>
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
//           <div className={cx(styles.fleetStatus, styles.fleetBlock)}>
//             <div className={styles.fleetInlineBlock}>
//               <div className={cx(styles.backgroundGradient, styles.fleetActivity)}>
//                 <FleetActivity />
//               </div>
//               <div className={styles.fleetActivity}>
//                 <div>
//                   <Categories />
//                 </div>
//                 <div>
//                   <img src={ map } alt="map" height="100%" width="100%" />
//                 </div>
//               </div>
//             </div>
//             <div className={cx(styles.fleetInlineBlock, styles.targetBlock)}>
//               <Target />
//             </div>
//           </div>
//         </div>
//         <div className={cx(styles.fleetInlineBlock, styles.carsBlock)}>
//           <img src={ car } alt="map" height="100%" width="100%" />
//         </div>
//       </div>




//       <div>
//         <HeaderSite/>
//         <div className={styles.layout}>
//           <div className={cx(styles.layoutSideRight,styles.layoutCol20)}>
//              <img src="/assets/images/3.jpg"/>
//           </div>
//           <div className={cx(styles.layoutSideLeft,styles.layoutCol80)}>
//             <div className={cx(styles.backgroundGradient, styles.fleetStatus)}>
//               <CarsStatus
//                 registeredCars={argusComponents.fleetStatus.registered}
//                 percentRegistered={12}
//                 active={argusComponents.fleetStatus.activity}
//                 uptodate={argusComponents.fleetStatus.updated}
//                 updateData={'13.01.16'}
//               />
//               <Anomalies
//                 anomalies={argusComponents.totalAnomalies.total_sum}
//                 cars1={argusComponents.totalAnomalies.cars1}
//                 percent={argusComponents.totalAnomalies.blocked_percent}
//                 percentRight={argusComponents.totalAnomalies.suspicious_percent}
//                 unblocked={argusComponents.totalAnomalies.suspicious_sum}
//                 cars2={argusComponents.totalAnomalies.cars2}
//                 blocked={argusComponents.totalAnomalies.blocked_sum}
//                 cars3={argusComponents.totalAnomalies.cars3}
//               />
//             </div>
//             <div className={cx(styles.layoutSideRight,styles.layoutCol25)}>
//               <Target />
//               <img src="/assets/images/2.jpg"/>
//             </div>
//             <div className={styles.fleetStatus,styles.layoutSideLeft,styles.layoutCol75}>
//               <div className={cx(styles.backgroundGradient, styles.fleetActivity)}>
//                 <FleetActivity />
//               </div>
//               <div className={cx(styles.fleetActivity,styles.layoutCol50)}>
//                 <Categories />
//               </div>
//               <div className={styles.layoutCol50}>
//                  <img src="/assets/images/1.jpg"/>
//               </div>
//             </div>
//           </div>


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