import React from 'react';
import ReactDom from 'react-dom'
import { hot } from 'react-hot-loader/root';

import RockScissorPaper from './RockScissorPaper';

const Hot = hot(RockScissorPaper);

ReactDom.render(<Hot />, document.querySelector('#root'))