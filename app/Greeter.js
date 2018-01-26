var config = require('./config.json');
import '../app/main.css';
import '../app/greeter.less'

module.exports = function() {
  setTimeout(() => {
    console.log('id:');
  }, 100);
  var greet = document.createElement('div');
  greet.textContent = config.greetText;
  return greet;
};