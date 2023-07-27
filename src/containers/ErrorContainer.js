import React, { Component } from 'react'

export default class ErrorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    }
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  // eslint-disable-next-line no-unused-vars
  componentDidCatch(error, errorInfo) {
  }
  render() {
    if(this.state.hasError) {
      return <h1>Sorry Something went wrong...</h1>
    }

    // eslint-disable-next-line react/prop-types
    return this.props.children
  }
}
