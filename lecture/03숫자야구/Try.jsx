import React, { Component } from 'react';
import { render } from 'react-dom';

export default function Try({ tryInfo}) {
  return (
    <>
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>
    </>
  )
}