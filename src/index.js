import _ from 'lodash';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import './style.css';
const design = require('./design')

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
let menu = design.card("http://openweathermap.org/img/wn/02d@2x.png","Wheaterapp","Wheaterapp with Openwheatermap API: https://openweathermap.org/api.","menu")
container.appendChild(design.searchbar());
container.appendChild(menu);