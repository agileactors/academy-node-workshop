const racer = () => {
  setTimeout(() => console.log('timeout1'), 1000);
  // setImmediate(() => console.log('immediate'));
  console.log('console');
  process.nextTick(() => console.log('nextTick'));
  setTimeout(() => console.log('timeout0'), 0);
};

racer();
