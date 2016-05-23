
import config from 'config';

/* ============================================================================ */ 
/* ============================== Init function =============================== */ 
/* ============================================================================ */ 

window.argusApi = {};

window.argusComponents = {};

argusComponents.dataFrom = '5s';


function http(url) {
  return new Promise((resolve, reject) => {
    const client = new XMLHttpRequest();
    client.open('GET', url);
    client.send();
    client.onload = function () {
      if (this.status === 200) resolve(JSON.parse(this.response));
      else reject(this.statusText);
    };
    client.onerror = function () { reject(this.statusText) };
  });
}


/* ============================================================================ */ 
/* ================== Build data for each componete function ================== */ 
/* ============================================================================ */ 


function confidence() {
   var confidence = {};

  const informationData = [
    { offset: window.innerWidth / 25.26, color: '#ffeeb2', val: 50 },
    { offset: window.innerWidth / 15.5, color: '#ffe400', val: 60 },
    { offset: window.innerWidth / 11.2, color: '#f07742', val: 100 },
    { offset: window.innerWidth / 8.73, color: '#ff7f00', val: 93 },
    { offset: window.innerWidth / 7.16, color: '#ff7f00', val: 48 },
        { offset: window.innerWidth / 7.16, color: '#ff7f00', val: 48 },
  ];


   var items= [],item = {};
   for(var i in argusApi.anomaliesByConfidence) {
     item = {};
     item.total = argusApi.anomaliesByConfidence[i].total;
     item.offset = informationData[i].offset;
     item.color = informationData[i].color;
     item.key = argusApi.anomaliesByConfidence[i].key;

     items.push(item);
   }

   confidence.data = items;

    let max = 0;
    for(var i in confidence.data) {
      if(confidence.data[i].total > max)
        max = confidence.data[i].total;
    }

    if(max > 500)  max = 1000;
    if(max <= 500)  max = 500;
    if(max <= 100)  max = 100;
    if(max <= 10)   max = 10;
    if(max <= 5)    max = 5;

    confidence.maxDomain = max;

   argusComponents.confidence = confidence;
}

function anomaliesTable(){
//   argusApi.anomaliesDetails =[{id:2,confidence:2,blocked:'dde',date:new Date(),time:20,bus: 1,
//                       msgId:2,data:'',category:'invalidData',vehicleId:'ff',ruleset:'129'},
//              {id:3,confidence:2,blocked:'dde',date:new Date(),time:20,bus: 1,
//         msgId:2,data:'',category:'noData',vehicleId:'gdgdg',ruleset:'129'}];


    store.dispatch({type:'SET_ANOMALIES',data:argusApi.anomaliesDetails})
}


function maps() {
  store.dispatch({
    type: 'SET_LOCATIONS',
    data: argusApi.heatmap,
  });
}

function category() {
 const old = [
  { offset: window.innerWidth / 25.26, color: '#b2d733' },
  { offset: window.innerWidth / 15.5, color: '#13aa38' },
  { offset: window.innerWidth / 11.2, color: '#1156e4' },
  { offset: window.innerWidth / 8.73, color: '#904fff' },
  { offset: window.innerWidth / 7.16, color: '#fff' }
 ];

  const category = [];
  let item = {};
  let sum = 0;

  for (let i in argusApi.anomaliesByCause) {
    sum += argusApi.anomaliesByCause[i].total;
  }
 
  for (let i in argusApi.anomaliesByCause) {
    item = {};
    item.text = argusApi.anomaliesByCause[i].key.replace(/_/g, ' ');
    item.percent = Math.floor(argusApi.anomaliesByCause[i].total * 100 / sum);
    item.offset = old[i].offset;
    item.color = old[i].color;
    category.push(item);
  }
  argusComponents.category = category;

//   store.dispatch({type:'SET_CATEGORIES',data:category});
}

function target() {
    var target = {};
        target.ECU = argusApi.anomaliesByEcu;
        target.MSG = argusApi.anomaliesByMessage;
        target.Vehicle = argusApi.anomaliesByVehicle;

    let max = 0;
    for(var i in target.ECU) {
      if(target.ECU[i].total > max)
        max = target.ECU[i].total;
    }

    for(var i in target.MSG) {
      if(target.MSG[i].total > max)
        max = target.MSG[i].total;
    }

    for(var i in target.Vehicle) {
      if(target.Vehicle[i].total > max)
        max = target.Vehicle[i].total;
    }

    if(max > 1000)  max = 10000;
    if(max <= 1000)  max = 1000;
    if(max <= 500)  max = 500;
    if(max <= 100)  max = 100;
    if(max <= 10)   max = 10;
    if(max <= 5)    max = 5;

    target.maxDomain = max;
    argusComponents.target = target;

}

function totalAnomalies() {
  const totalAnomalies = {};
  let suspicious_sum = 0;
  let blocked_sum = 0;

    for(var i in argusApi.anomalies) {
      suspicious_sum = suspicious_sum + argusApi.anomalies[i].values[0].value;
      blocked_sum = blocked_sum + argusApi.anomalies[i].values[1].value;
    }

    totalAnomalies.suspicious_sum = suspicious_sum;
    totalAnomalies.blocked_sum = blocked_sum;
    totalAnomalies.total_sum = suspicious_sum + blocked_sum;

    totalAnomalies.suspicious_percent = suspicious_sum / totalAnomalies.total_sum * 100;
    totalAnomalies.blocked_percent = blocked_sum / totalAnomalies.total_sum * 100;


  totalAnomalies.suspicious_sum = suspicious_sum;
  totalAnomalies.blocked_sum = blocked_sum;
  totalAnomalies.total_sum = suspicious_sum + blocked_sum;

  totalAnomalies.suspicious_percent = totalAnomalies.total_sum / suspicious_sum * 100;
  totalAnomalies.blocked_percent = totalAnomalies.total_sum / blocked_sum * 100;

  totalAnomalies.cars1 = 90;
  totalAnomalies.cars2 = 85;
  totalAnomalies.cars3 = 5;
  argusComponents.totalAnomalies = totalAnomalies;
}

function fleetStatus() {
  const fleetStatus = {};
  fleetStatus.registered = argusApi.registeredVehicles.count;
  fleetStatus.activity = argusApi.activitys[argusApi.activitys.length - 1].values[0].value / argusApi.registeredVehicles.count * 100;
  fleetStatus.updated = argusApi.updatedVehicles.count / argusApi.registeredVehicles.count * 100;
  argusComponents.fleetStatus = fleetStatus;
}

function fleetActivity() {
  argusComponents.fleetActivity = {};
  const bars = [];
  let item = {};
  for (let i in argusApi.activitys) {
    item = {};
    item.time = argusApi.activitys[i].timestamp;
    item.activitys = argusApi.activitys[i].values[0].value;
    item.suspicious = argusApi.anomalies[i].values[0].value;
    item.blocked = argusApi.anomalies[i].values[1].value;

//      item.activitys = Math.floor((Math.random() * 10));
//      item.suspicious = Math.floor((Math.random() * 100) + 90);
//      item.blocked = Math.floor((Math.random() * 50));

    bars.push(item);
  }

 argusComponents.fleetActivity.registered = window.argusApi.registeredVehicles.count;
 argusComponents.fleetActivity.bars = bars;
}

/* ============================================================================ */ 
/* =============================== Run function =============================== */ 
/* ============================================================================ */ 

function getApiData(tags) {
  // Group API for:
  //    fleetStatus | fleetActivity | totalAnomalies
//   http(`${config.apiBaseUrl}/v1/metrics/tags/${tags}/bars/${argusComponents.dataFrom}/1/activeVehiclesStatus?from=0`).then((data) => {
//     statusActivityAnomalies_buildData('activitys', data.data);
//   });

//   http(`${config.apiBaseUrl}/v1/metrics/tags/${tags}/bars/${argusComponents.dataFrom}/1/anomalies?from=0`).then((data) => {
//     statusActivityAnomalies_buildData('anomalies', data.data);
//   });

//   http(`${config.apiBaseUrl}/v1/tags/${tags}/vehicles/counts/total`).then((data) => {
//     statusActivityAnomalies_buildData('registeredVehicles', data.data[0]);
//   });

//   http(`${config.apiBaseUrl}/v1/metrics/tags/${tags}/statuses/vehicles/counts/updated`).then((data) => {
//     statusActivityAnomalies_buildData('updatedVehicles', data.data[0]);
//   });
 
  // Group API for:
  //    heatmap
//   http(`${config.apiBaseUrl}/v1/metrics/tags/${tags}/heatmap?from=0`).then((data) => {
//     if (!window.argusApi.heatmap || window.argusApi.heatmap.length !== data.data.length) {
//       window.argusApi.heatmap = data.data;
//       maps();
//     }
//   });

  // Group API for:
  //    alerts
//   http(`${config.apiBaseUrl}/v1/alerts/vehicle`).then((data) => {
//     alerts_buildData('alertsVehicle', data.data);
//   });
//   http(`${config.apiBaseUrl}/v1/alerts/message`).then((data) => {
//     alerts_buildData('alertsMessage', data.data);
//   });

  // Group API for:
  //    Category
//   http(`${config.apiBaseUrl}/v1/metrics/tags/${tags}/bars/all/2/anomaliesByCause?from=0`).then((data) => {
//       argusApi.anomaliesByCause = data.data;
//       category();
//   });

  // Group API for:
  //    Target
  http(`${config.apiBaseUrl}/v1/metrics/tags/${tags}/bars/all/2/anomaliesByEcu?from=0`).then((data)=>{
    target_buildData("anomaliesByEcu",data.data)
  })
  http(`${config.apiBaseUrl}/v1/metrics/tags/${tags}/bars/all/2/anomaliesByVehicle?from=0`).then((data)=>{
    target_buildData("anomaliesByVehicle",data.data)
  })
  http(`${config.apiBaseUrl}/v1/metrics/tags/${tags}/bars/all/2/anomaliesByMessage?from=0`).then((data)=>{
    target_buildData("anomaliesByMessage",data.data)
  })

  // Group API for:
  //    anomaliesTable
//   http(`${config.apiBaseUrl}/v1/tags/${tags}/anomalies?from=0`).then((data)=>{
//     argusApi.anomaliesDetails = data.data;
//     anomaliesTable();
//   })
//   http(`${config.apiBaseUrl}/v1/metrics/tags/${tags}/bars/all/2/anomaliesByConfidence?from=0`).then((data)=>{
//     argusApi.anomaliesByConfidence = data.data;
//     confidence();
//   })

}

let targetFlags = 0;

function target_buildData(component, data) {
  window.argusApi[component] = data;
  if (++targetFlags === 3) {
    target();
    targetFlags = 0;
  }
}

let statusActivityAnomaliesFlags = 0;

function statusActivityAnomalies_buildData(component, data) {
  window.argusApi[component] = data;
  if (++statusActivityAnomaliesFlags === 4) {
    fleetStatus();
    fleetActivity();
    totalAnomalies();
    statusActivityAnomaliesFlags = 0;
  }
}


let alertsFlags = 0;

function alerts_buildData(component, data) {
  window.argusApi[component] = data;
  if (++alertsFlags === 2) {
    store.dispatch({
      type: 'SET_ALERTS',
      data: {
        msg: argusApi.alertsMessage,
        vehicle: argusApi.alertsVehicle,
      },
    });
    alertsFlags = 0;
  }
}

function defaultData() {
  window.argusApi.registeredVehicles = { count: 1 };

  window.argusApi.updatedVehicles = { count: 1 };

  window.argusApi.activitys = [{
    timestamp: 0,
    values: [{
      key: 'all',
      value: 1,
    }],
  }];

  window.argusApi.anomalies = [{
    timestamp: 0,
    values: [{
      key: 'total',
      value: 1,
    },
    {
      key: 'blocked',
      value: 1,
    }],
  }];

  argusApi.anomaliesByEcu = [];
  argusApi.anomaliesByMessage = [];
  argusApi.anomaliesByVehicle = [];

  argusComponents.confidence = {data:[],maxDomain:1000};

  fleetStatus();
  fleetActivity();
  totalAnomalies();

  category();
  target();
}

window.updateApiData = function (dataFrom) {
  argusComponents.dataFrom = dataFrom;
  getApiData('11111111-1111-1111-3333-000000000031');
};

window.setInterval(() => {
  getApiData('11111111-1111-1111-3333-000000000031');
  store.dispatch({
    type: '0',
  });
}, 10000);

defaultData();
getApiData('11111111-1111-1111-3333-000000000031');
