import React, { Component } from 'react';
import { render } from 'react-dom';

export default function Try({value, index}) {
  return (
    <>
      <li>{value} - {index}</li>
    </>
  )
}