import React from 'react';

import Button from 'components/button';

import styles from './styles.pcss';

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
    console.log('Render <Error />');
    if (this.state.hasError) {
      return (
        <div className={styles.error}>
          <h1 className={styles.title}>:(</h1>
          <p>
            Oopsie Woopsie! UwU we made a fucky wucky!! A wittle fucko boingo!
            The code monkeys at our headquarters are working VEWY HAWD to fix this!
          </p>

          <Button
            brand='white'
            onClick={() => location.reload()}
            text='Reload'
          />
        </div>
      );
    }

    return this.props.children;
  }
}