// Get the current IP address of the user
var ipAddress = '';

fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    ipAddress = data.ip;
    // Check if the IP address has already visited the page
    if (localStorage.getItem(ipAddress) !== null) {
      // If the IP address has visited the page before, increment the counter
      var count = parseInt(localStorage.getItem(ipAddress));
      count++;
      localStorage.setItem(ipAddress, count);
      document.getElementById('counter').innerHTML = count;
    } else {
      // If the IP address has not visited the page before, set the counter to 1
      localStorage.setItem(ipAddress, 1);
      document.getElementById('counter').innerHTML = 1;
    }
  })
  .catch(error => console.error(error));