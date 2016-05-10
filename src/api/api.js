
import config from 'config';

window.argusApi = {}; 

window.argusComponents= {};

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

  http(`${config.apiBaseUrl}/v1/metrics/tags/${tags}/bars/5s/1/activeVehiclesStatus?from=0`).then((data)=>{
    buildData("activitys",data.data)
  })

  http(`${config.apiBaseUrl}/v1/metrics/tags/${tags}/bars/5s/1/anomalies?from=0`).then((data)=>{
    buildData("anomalies",data.data)
  })

  http(`${config.apiBaseUrl}/v1/tags/${tags}/vehicles/counts/total`).then((data)=>{
    buildData("registeredVehicles",data.data[0])
  })

  http(`${config.apiBaseUrl}/v1/metrics/tags/${tags}/statuses/vehicles/counts/updated`).then((data)=>{
    buildData("updatedVehicles",data.data[0])
  })



  http(`${config.apiBaseUrl}/v1/metrics/tags/${tags}/bars/5s/2/anomaliesByCause?from=0`).then((data)=>{
    CATEGORIES_TARGET_buildData("anomaliesByCause",data.data[0])
  })
  http(`${config.apiBaseUrl}/v1/metrics/tags/${tags}/bars/5s/2/anomaliesByEcu?from=0`).then((data)=>{
    CATEGORIES_TARGET_buildData("anomaliesByEcu",data.data[0])
  })
  http(`${config.apiBaseUrl}/v1/metrics/tags/${tags}/bars/5s/2/anomaliesByVehicle?from=0`).then((data)=>{
    CATEGORIES_TARGET_buildData("anomaliesByVehicle",data.data[0])
  })
  http(`${config.apiBaseUrl}/v1/metrics/tags/${tags}/bars/5s/2/anomaliesByMessage?from=0`).then((data)=>{
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
 
   var dd= [
  { time: 'Wed, 20 Apr 2016 16:00:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 20 Apr 2016 16:15:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 20 Apr 2016 16:30:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 20 Apr 2016 16:45:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 20 Apr 2016 17:00:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 20 Apr 2016 17:15:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 20 Apr 2016 17:30:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 20 Apr 2016 17:45:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 20 Apr 2016 18:00:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 20 Apr 2016 18:15:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 20 Apr 2016 18:30:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 20 Apr 2016 18:45:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 20 Apr 2016 19:00:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 20 Apr 2016 19:15:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 20 Apr 2016 19:30:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 20 Apr 2016 19:45:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 20 Apr 2016 20:00:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 20 Apr 2016 20:15:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 20 Apr 2016 20:30:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 20 Apr 2016 20:45:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 20 Apr 2016 21:00:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 20 Apr 2016 21:15:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 20 Apr 2016 21:30:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 20 Apr 2016 21:45:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 20 Apr 2016 22:00:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 20 Apr 2016 22:15:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 20 Apr 2016 22:30:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 20 Apr 2016 22:45:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 20 Apr 2016 23:00:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 20 Apr 2016 23:15:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 20 Apr 2016 23:30:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 20 Apr 2016 23:45:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Thu, 21 Apr 2016 00:00:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Thu, 21 Apr 2016 00:15:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Thu, 21 Apr 2016 00:30:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Thu, 21 Apr 2016 00:45:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 1:00:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 1:15:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 1:30:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 1:45:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 2:00:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 2:15:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 2:30:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 2:45:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 3:00:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 3:15:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 3:30:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 3:45:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 4:00:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 4:15:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 4:30:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 4:45:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 5:00:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 5:15:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 5:30:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 5:45:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 6:00:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 6:15:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 6:30:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 6:45:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 7:00:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 7:15:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 7:30:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 7:45:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 8:00:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 8:15:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 8:30:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 8:45:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 9:00:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 9:15:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 9:30:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 9:45:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 10:00:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 10:15:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 10:30:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 10:45:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 11:00:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 11:15:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 11:30:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 11:45:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 12:00:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 12:15:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 12:30:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 12:45:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 13:00:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 13:15:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 13:30:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 13:45:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 14:00:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 14:15:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 14:30:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 14:45:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 15:00:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 15:15:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 15:30:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 15:45:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 16:00:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 16:15:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 16:30:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 16:45:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 17:00:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 17:15:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 17:30:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 17:45:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 18:00:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 18:15:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 18:30:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 18:45:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 19:00:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 19:15:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 19:30:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 19:45:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 },
  { time: 'Wed, 21 Apr 2016 20:00:00 GMT', val1: Math.random() * 100,
    val2: Math.random() * 50 + 50, val3: Math.random() * 100 + 50 }];

       argusComponents.fleetActivity = {}

   var bars= [],item = {};
   for(var i in argusApi.activitys) {
     item = {};
     item.time = dd[i].time;// argusApi.activitys[i].timestamp;
//      item.activitys = argusApi.activitys[i].values[0].value;
//      item.suspicious = argusApi.anomalies[i].values[0].value;
//      item.blocked = argusApi.anomalies[i].values[1].value;

     item.activitys = Math.floor((Math.random() * 3000) + 5000);
     item.suspicious = Math.floor((Math.random() * 100) + 100);
     item.blocked = Math.floor((Math.random() * 50));


     bars.push(item);
   }
   argusComponents.fleetActivity.bars = bars;

   
}


