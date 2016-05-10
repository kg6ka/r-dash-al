
import config from 'config';

window.argusApi = {}; 

window.argusComponents= {};

argusComponents.dataFrom = "5s";

var flags = 0;


function http(url) {
    var promise = new Promise(function(resolve, reject) {
        var client = new XMLHttpRequest()
        client.open("GET", url)
        client.send()
        client.onload = function() {
            if (this.status == 200) resolve(JSON.parse(this.response));
            else reject(this.statusText);
        }
        client.onerror = function() { reject(this.statusText) }
    })
    return promise;
}


function getApiData(tags){

  http(`${config.apiBaseUrl}/v1/metrics/tags/${tags}/bars/${argusComponents.dataFrom}/1/activeVehiclesStatus?from=0`).then((data)=>{
    buildData("activitys",data.data)
  })

  http(`${config.apiBaseUrl}/v1/metrics/tags/${tags}/bars/${argusComponents.dataFrom}/1/anomalies?from=0`).then((data)=>{
    buildData("anomalies",data.data)
  })

  http(`${config.apiBaseUrl}/v1/tags/${tags}/vehicles/counts/total`).then((data)=>{
    buildData("registeredVehicles",data.data[0])
  })

  http(`${config.apiBaseUrl}/v1/metrics/tags/${tags}/statuses/vehicles/counts/updated`).then((data)=>{
    buildData("updatedVehicles",data.data[0])
  })



  http(`${config.apiBaseUrl}/v1/metrics/tags/${tags}/bars/${argusComponents.dataFrom}/2/anomaliesByCause?from=0`).then((data)=>{
    CATEGORIES_TARGET_buildData("anomaliesByCause",data.data[0])
  })
  http(`${config.apiBaseUrl}/v1/metrics/tags/${tags}/bars/${argusComponents.dataFrom}/2/anomaliesByEcu?from=0`).then((data)=>{
    CATEGORIES_TARGET_buildData("anomaliesByEcu",data.data[0])
  })
  http(`${config.apiBaseUrl}/v1/metrics/tags/${tags}/bars/${argusComponents.dataFrom}/2/anomaliesByVehicle?from=0`).then((data)=>{
    CATEGORIES_TARGET_buildData("anomaliesByVehicle",data.data[0])
  })
  http(`${config.apiBaseUrl}/v1/metrics/tags/${tags}/bars/${argusComponents.dataFrom}/2/anomaliesByMessage?from=0`).then((data)=>{
    CATEGORIES_TARGET_buildData("anomaliesByMessage",data.data[0])
  })

}

function CATEGORIES_TARGET_buildData(component,data){
  window.argusApi[component] = data;
  flags++;
  if (flags == 4) {
    category();
    target();
//     fleetStatus();
//     fleetActivity();
//     totalAnomalies();
    flags = 0;
  }
}

function buildData(component,data) {
  window.argusApi[component] = data;
  flags++;
  if (flags == 4) {
    fleetStatus();
    fleetActivity();
    totalAnomalies();
    flags = 0;
  }
}

window.setInterval(() => {
  getApiData("1111");
}, 5000);

defaultData();

function defaultData() {
  window.argusApi.registeredVehicles = { "count": 1 };

  window.argusApi.updatedVehicles = { "count": 1 };

  window.argusApi.activitys = [{"timestamp":0,"values":[{"key":"all","value":1}]}];

  window.argusApi.anomalies = [{"timestamp":0,"values":[{"key":"total","value":1},{"key":"blocked","value":1}]}];


  fleetStatus();
  fleetActivity();
  totalAnomalies();

  category();
  target();
}

function category(){
  var category = {};
    category = [
  { offset: window.innerWidth / 25.26, color: '#b2d733',
    text: 'Irrational Data', percent: 53 },
  { offset: window.innerWidth / 15.5, color: '#13aa38',
    text: 'Timing Anomaly', percent: 20 },
  { offset: window.innerWidth / 11.2, color: '#1156e4',
    text: 'Abnormal diagnostics', percent: 12 },
  { offset: window.innerWidth / 8.73, color: '#904fff',
    text: 'Mix', percent: 5 },
  { offset: window.innerWidth / 7.16, color: '#fff',
    text: 'Others', percent: 8 },
];
  argusComponents.category = category;
}

function target() {

    var target = {};
        target.ECU = argusApi.anomaliesByEcu;
        target.MSG = argusApi.anomaliesByMessage;
        target.Vehicle = argusApi.anomaliesByVehicle;

 target.Vehicle = [
  {
    name: 'OLS',
    total: 80,
    blocked: 30,
  },
  {
    name: 'BCM',
    total: 30,
    blocked: 10,
  },
  {
    name: 'BTRS',
    total: 75,
    blocked: 36,
  },
];


 target.MSG = [
  {
    name: 'OLS',
    total: 80,
    blocked: 30,
  },
  {
    name: 'BCM',
    total: 30,
    blocked: 10,
  },
  {
    name: 'BTRS',
    total: 75,
    blocked: 36,
  },
  {
    name: 'AFCM',
    total: 160,
    blocked: 100,
  },
  {
    name: 'APIM',
    total: 100,
    blocked: 50,
  },
  {
    name: 'OLS',
    total: 80,
    blocked: 30,
  },
  {
    name: 'BCM',
    total: 30,
    blocked: 10,
  },
  {
    name: 'BTRS',
    total: 75,
    blocked: 36,
  },
];


 target.ECU = [
  {
    name: 'AFCM',
    total: 160,
    blocked: 100,
  },
  {
    name: 'APIM',
    total: 100,
    blocked: 50,
  },
  {
    name: 'OLS',
    total: 80,
    blocked: 30,
  },
  {
    name: 'BCM',
    total: 30,
    blocked: 10,
  },
  {
    name: 'BTRS',
    total: 75,
    blocked: 36,
  },
  {
    name: 'AFCM',
    total: 160,
    blocked: 100,
  },
  {
    name: 'APIM',
    total: 100,
    blocked: 50,
  },
  {
    name: 'OLS',
    total: 80,
    blocked: 30,
  },
  {
    name: 'BCM',
    total: 30,
    blocked: 10,
  },
  {
    name: 'BTRS',
    total: 75,
    blocked: 36,
  },
];

    argusComponents.target = target;

}


function totalAnomalies() {

    // Total Anomalies

    var totalAnomalies = {},suspicious_sum = 0,blocked_sum = 0;

    for(var i in argusApi.anomalies) {
      suspicious_sum = suspicious_sum + argusApi.anomalies[i].values[0].value;
      blocked_sum = blocked_sum + argusApi.anomalies[i].values[1].value;
    }

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

    var fleetStatus = {};
    fleetStatus.registered = argusApi.registeredVehicles.count;
    fleetStatus.activity = argusApi.activitys[argusApi.activitys.length -1].values[0].value / argusApi.registeredVehicles.count * 100;
    fleetStatus.updated = argusApi.updatedVehicles.count / argusApi.registeredVehicles.count * 100;

    argusComponents.fleetStatus = fleetStatus;

}

function fleetActivity() {
  
   argusComponents.fleetActivity = {}

   var bars= [],item = {};
   for(var i in argusApi.activitys) {
     item = {};
     item.time = argusApi.activitys[i].timestamp;
     item.activitys = argusApi.activitys[i].values[0].value;
     item.suspicious = argusApi.anomalies[i].values[0].value;
     item.blocked = argusApi.anomalies[i].values[1].value;

     item.activitys = Math.floor((Math.random() * 3000) + 5000);
     item.suspicious = Math.floor((Math.random() * 100) + 100);
     item.blocked = Math.floor((Math.random() * 50));


     bars.push(item);
   }
   argusComponents.fleetActivity.bars = bars;

   
}


