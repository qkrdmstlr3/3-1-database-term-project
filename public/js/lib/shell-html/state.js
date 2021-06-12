/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explici */
/**
 * To manage global state
 * Used for state management between components
 */

class Store {
  states; // state
  components;

  constructor() {
    this.states = {};
    this.components = {};
  }

  observe(key, component, func) {
    this.components[key].push([component, func]);
  }

  disobserve(key, component) {
    const index = this.components[key].findIndex(([c]) => c === component);
    this.components[key].splice(index, 1);
  }

  addState({ key, initial }) {
    this.components[key] = [];
    this.states[key] = initial;
  }

  setGlobalState(key, value) {
    if (this.states[key] && this.states[key] != value) {
      this.states[key] = value;
      this.components[key].forEach(([component, func]) => {
        func.call(component);
      });
    }
  }
}

const store = new Store();

export function state(pearlData) {
  store.addState(pearlData);
}

export function useGlobalState(key) {
  return store.states[key]; // FIXME: have to ensure immutability
}

export function setGlobalState(key, value) {
  store.setGlobalState(key, value);
}

export function observe(key, component, func) {
  store.observe(key, component, func);
}

export function disObserve(key, component) {
  store.disobserve(key, component);
}

export default Store;
