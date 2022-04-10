import React, { Component, memo } from 'react';
import { render } from 'react-dom';

const Try = memo(({ tryInfo }) => {
  return (
    <>
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>
    </>
  )
});

export default Try;