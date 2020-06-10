import React, { Component } from 'react'
import Select from 'react-select'

const options = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' }
]

 const  MyComponent = () => (
  <Select options={options} placeholder='Gender'/>
)
export default MyComponent