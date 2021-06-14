// Dependencies
import { render } from './lib/shell-html/index.js';

// Components
import './components/Layout/index.js';
import './components/Sidebar/index.js';
import './components/Main/index.js';

render('layout-component', document.getElementById('root'));
