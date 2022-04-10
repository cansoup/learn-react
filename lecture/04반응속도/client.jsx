/** require: node의 모듈시스템 */
/** import from으로 대체할 수 있다. */
// const React = require('react');
// const ReactDom = require('react-dom');
// const { hot } = require('react-hot-loader/root');

// const NumberBaseball = require('./NumberBaseball');

import React from 'react';
import ReactDom from 'react-dom'
import { hot } from 'react-hot-loader/root';

import ResponseCheck from './ResponseCheck';

const Hot = hot(ResponseCheck);

ReactDom.render(<ResponseCheck />, document.querySelector('#root'))