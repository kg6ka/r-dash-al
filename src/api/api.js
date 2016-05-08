
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
     item.time = argusApi.activitys[i].timestamp;
     item.val1 = argusApi.activitys[i].values[0].value;
     item.val2 = argusApi.anomalies[i].values[0].value;
     item.val3 = argusApi.anomalies[i].values[1].value;
     bars.push(item);
   }
   argusComponents.fleetActivity.bars= bars;
}


