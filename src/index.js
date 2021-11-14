import _ from 'lodash';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import './style.css';
const design = require('./design')
const api= require('./openweather')

const applicationServerPublicKey ="BKOeW7lXW6Efbra-_YMygVxCX7eGDAOhuaRGCpHUg9BlfMmJCjuZEnGs24vEgCagNxj16QNXUdnSnbpxXDRZZmE"
var isSubscribed = false;
var swRegistration = null;

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function update(){
    if (Notification.permission === 'denied') {
        updateSubscriptionOnServer(null);
        return;
    }
    else{
        console.log('ok: hey')
    }
}

function initializeUI() {
    if (isSubscribed) {
        unsubscribeUser();
    } else {
        subscribeUser();
    }
  
    // Set the initial subscription value
    swRegistration.pushManager.getSubscription()
    .then(subscription=>{
      isSubscribed = !(subscription === null);
  
      updateSubscriptionOnServer(subscription);
  
      if (isSubscribed) {
        console.log('User IS subscribed.');
      } else {
        console.log('User is NOT subscribed.');
      }
  
      update();
    });
}

function unsubscribeUser() {
    swRegistration.pushManager.getSubscription()
    .then(function(subscription) {
      if (subscription) {
        return subscription.unsubscribe();
      }
    })
    .catch(function(error) {
      console.log('Error unsubscribing', error);
    })
    .then(function() {
      updateSubscriptionOnServer(null);
  
      console.log('User is unsubscribed.');
      isSubscribed = false;
  
      update();
    });
}
  
function subscribeUser() {
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    })
    .then(function(subscription) {
      console.log('User is subscribed.');
  
      updateSubscriptionOnServer(subscription);
  
      isSubscribed = true;
  
      update();
    })
    .catch(function(err) {
      console.log('Failed to subscribe the user: ', err);
      update();
    });
}

function updateSubscriptionOnServer(subscription) {
  
    if (subscription) {
      console.log(JSON.stringify(subscription));
    } else {
      console.log("no sub")
    }
}
  

if ('serviceWorker' in navigator && 'PushManager' in window) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').then(registration => {
            console.log('SW registered: ', registration);
            swRegistration = registration;
            initializeUI();
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}
else
{
    console.warn('Push messaging is not supported');
}

function component() {
    const element = document.createElement('div');
    return element;
}

function Container(){
  const container=document.createElement('div');
  container.className="container-md";
  return container;
}

const container=Container();
document.body.appendChild(design.navBar());
document.body.appendChild(container);
var elem_arr=design.searchbar()
container.appendChild(elem_arr[0]);
elem_arr[2].onclick=(e)=>{
  let card=document.getElementsByClassName("card")
  console.log(card)
  if(card.length!=0)
    card[0].remove()
  api.get_wheater(elem_arr[1].value)
  .then(res=>{
    console.log(res)
    let menu = design.card(`http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`,res.weather[0].description,res.name,)
    container.appendChild(menu)
  })
}

function showPosition(position) {
  const geo={lat: position.coords.latitude, long: position.coords.longitude}
  api.get_wheater_geo(geo.lat,geo.long)
  .then(res=>{
    console.log(res)
    let menu = design.card(`http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`,res.weather[0].description,res.name,)
    container.appendChild(menu)
  })
}

window.addEventListener('load',()=>{
  if (navigator.geolocation) {
    let geo=navigator.geolocation.getCurrentPosition(showPosition);
    console.log(geo)
  } else {
    console.log("Geolocation is not supported by this browser.")
  }
})
// let menu = design.card("http://openweathermap.org/img/wn/02d@2x.png","Weatherapp","Weatherapp with Openweathermap API: https://openweathermap.org/api.","menu")
// container.appendChild(menu);