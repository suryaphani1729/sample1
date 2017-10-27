function displayNotification() {
  if (Notification.permission == 'granted') {
    navigator.serviceWorker.ready.then(function(reg) {
   // navigator.serviceWorker.getRegistration().then(function(reg) {
      var options = {
        body: 'Here is a notification body!',
        icon: 'logo.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        },
        actions: [
          {action: 'explore', title: 'Explore this new world',
            icon: 'logo.png'},
          {action: 'close', title: 'Close notification',
            icon: 'logo.png'},
        ]
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

