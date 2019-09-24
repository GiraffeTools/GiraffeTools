import {Graph} from 'graphlib';

const SingletonGraph = (() => {
  let instance;
  const createInstance = () => {
    instance = new Graph({directed: true, multigraph: true, compound: false});
  };

  return ({getInstance: () => instance || createInstance()});
})();

export default SingletonGraph;
