/**
 * 파일 설명
 *
 * 전역으로 관리되는 상태들입니다.
 * 컴포넌트들은 서로 캡슐화가 되어있음으로 서로가 서로에게 정보를 넘겨주기 위해서는 아래와 같이 전역상태를 만들어서 사용합니다.
 * 이 상태들은 컴포넌트끼리 공유할 수 있습니다.
 */
import { state } from './shell-html/index.js';

state({
  key: 'page',
  initial: 'books',
});

state({
  key: 'customer',
  initial: {
    name: undefined,
    cno: undefined,
  }
});
