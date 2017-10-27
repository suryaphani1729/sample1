function displayNotification() {
  if (Notification.permission == 'granted') {
    navigator.serviceWorker.ready.then(function(reg) {
   // navigator.serviceWorker.getRegistration().then(function(reg) {
      
      
       reg.pushManager.getSubscription().then(function(sub) {
      if (sub === null) {
        // Update UI to ask user to register for Push
        console.log('Not subscribed to push service!');
      } else {
        // We have a subscription, update the database
        console.log('Subscription object: ', sub);
      }
       });
         
         
      
      
      
      var options = {
        body: 'Here is a notification body!',
        icon: './sample1/src/logo.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        },
        actions: [
          {action: 'explore', title: 'Explore this new world',
            icon: './sample1/src/logo.png'},
          {action: 'close', title: 'Close notification',
            icon: './sample1/src/logo.png'},
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

