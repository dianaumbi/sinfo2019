
function sum(a, b) { return a+b; }


function Calculator(onStateChange) {
  this.onStateChange = onStateChange
  this.state = {}
  this.clear()
  return;
}

Calculator.prototype.setState = function(value) {
  Object.assign(this.state, value);
  this.onStateChange(this.state);
}

Calculator.prototype.appendDigit = function(digit) {
  let displayText = this.state.displayText == '0' ? digit: this.state.displayText + digit;
  this.setState({displayText});
  return;
}

Calculator.prototype.setOperation = function(operator) {
  let arg0 = Number.parseFloat(this.state.displayText);
  let fn;
  switch (operator) {
    case '+':
      fn = sum.bind(this, arg0);
      break;
    default:
      console.error(`unknown operation: ${operator}`, this)
      this.setErr()
      return;
  }
  this.setState({displayText: '0', arg0: arg0, fn: fn});
  return;
}
Calculator.prototype.execute = function() {
  if ( typeof(this.state.fn) === 'undefined') {
    // ignore undefined operations
    return;
  }
  let arg1 = Number.parseFloat(this.state.displayText);
  let result = this.state.fn(arg1);
  this.setState({displayText:''+result, arg0: arg1, fn: undefined});
};

Calculator.prototype.setErr = function(displayText='err') {
  this.setState({displayText:displayText, arg0: 0, fn: undefined});
}

Calculator.prototype.clear = function() {
  this.setState({displayText:'0', arg0: undefined, fn: undefined});
};

function notImplemented() {
  console.debug('not implementend')
  Promise.resolve().then(() => { window.alert(`not implemented: ${this.text}`) });
};
