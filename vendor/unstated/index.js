const React = require('react');

const UnstatedContext = React.createContext(null);

class Container {
  constructor() {
    this.state = this.state || {};
    this.__listeners = new Set();
  }

  setState(updater, callback) {
    const partial = typeof updater === 'function' ? updater(this.state) : updater;
    if (partial && typeof partial === 'object') {
      this.state = Object.assign({}, this.state, partial);
      this.__listeners.forEach((listener) => listener());
    }

    if (typeof callback === 'function') {
      callback();
    }

    return Promise.resolve();
  }

  subscribe(listener) {
    this.__listeners.add(listener);
    return () => this.unsubscribe(listener);
  }

  unsubscribe(listener) {
    this.__listeners.delete(listener);
  }
}

class Provider extends React.Component {
  constructor(props) {
    super(props);
    this.instances = new Map();
  }

  render() {
    return React.createElement(
      UnstatedContext.Provider,
      { value: this.instances },
      this.props.children
    );
  }
}

class Subscribe extends React.Component {
  static contextType = UnstatedContext;

  constructor(props, context) {
    super(props, context);
    this.state = { version: 0 };
    this.unsubscribers = [];
  }

  componentDidMount() {
    this.resubscribe();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.to !== this.props.to) {
      this.cleanup();
      this.resubscribe();
    }
  }

  componentWillUnmount() {
    this.cleanup();
  }

  getInstances() {
    const registry = this.context || new Map();
    return (this.props.to || []).map((ContainerClass) => {
      if (!registry.has(ContainerClass)) {
        registry.set(ContainerClass, new ContainerClass());
      }
      return registry.get(ContainerClass);
    });
  }

  resubscribe() {
    const instances = this.getInstances();
    this.unsubscribers = instances.map((instance) => {
      const unsubscribe = instance.subscribe(() => {
        this.setState((prev) => ({ version: prev.version + 1 }));
      });
      return unsubscribe;
    });
  }

  cleanup() {
    this.unsubscribers.forEach((unsubscribe) => unsubscribe && unsubscribe());
    this.unsubscribers = [];
  }

  render() {
    const children = this.props.children;
    const instances = this.getInstances();

    if (typeof children === 'function') {
      return children(...instances);
    }

    return null;
  }
}

module.exports = {
  Container,
  Provider,
  Subscribe,
};
