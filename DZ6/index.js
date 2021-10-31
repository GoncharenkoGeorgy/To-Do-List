console.newLog = console.log.bind(console);

console.log = function (arguments) {

  const date = `${new Date()} |`;
  this.newLog(date, arguments);

};

console.log('test');