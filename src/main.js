function displayNotification() {
  if (Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then(function(reg) {
      var options = {
        body: 'Here is a notification body!',
       
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        }
      };
      reg.showNotification('Hello world!', options);
    });
  }
  else{
    
    Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status);
      
});
  }
}
displayNotification();
// icon: 'images/example.png',
