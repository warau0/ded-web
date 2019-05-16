import React from 'react';

export default class Error extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>:(</h1>
          <p>
            Oopsie Woopsie! UwU we made a fucky wucky!! A wittle fucko boingo!
            The code monkeys at our headquarters are working VEWY HAWD to fix this!
            </p>
        </>
      );
    }

    return this.props.children;
  }
}