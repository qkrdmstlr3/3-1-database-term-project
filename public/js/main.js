/**
 * 파일 설명
 *
 * js의 엔트리 파일, 필요한 모듈들을 모두 가져온다
 */
// Dependencies
import { render } from './lib/shell-html/index.js';
import './lib/state.js';

// Components
import './components/Layout/index.js';
import './components/Sidebar/index.js';
import './components/Main/index.js';
import './components/Books/index.js';
import './components/Mypage/index.js';

render('layout-component', document.getElementById('root'));
