// Dependencies
import { render } from './lib/shell-html/index.js';
import './lib/state.js';

// Components
import './components/Layout/index.js';
import './components/Sidebar/index.js';
import './components/Main/index.js';
import './components/Books/index.js';
import './components/Mypage/index.js';
import './components/Statistic/index.js';

render('layout-component', document.getElementById('root'));
