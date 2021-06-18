import { state } from './shell-html/index.js';

state({
  key: 'page',
  initial: 'books',
});

state({
  key: 'customer',
  initial: {
    name: undefined,
  }
});
