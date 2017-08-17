import React from 'react';
import ReactDOM from 'react-dom';
import Sync from '../../build/sync-with';

export default class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <div ref={this.firstRefs.ref} className='firstComponent'>Test 0</div>
        <Sync ref={this.firstRefs.syncRef} />
        <MyComponent ref={this.myRefs.ref} />
        <Sync ref={this.myRefs.syncRef} />
        {
          this.state.thirdMounted ?

            <div ref={this.thirdRefs.ref} style={{color: 'red'}}>
              Test 3. <AnotherComponent someProp={"I'm third"} />
            </div> :
            
            null
        }
        <Sync ref={this.thirdRefs.syncRef} />
      </div>
    );
  }
  
  componentWillMount() {
    this.state = { thirdMounted: true };
    setTimeout(() => this.setState({ thirdMounted: false }), 2000);

    this.firstRefs = Sync.createRefCallbacks();
    this.myRefs = Sync.createRefCallbacks();
    this.thirdRefs = Sync.createRefCallbacks();
  }
};

class AnotherComponent extends React.Component {
  render() {
    return (
      <div className='another-component'>Test 2. { this.props.someProp }</div>
    );
  }
}

class MyComponent extends React.Component {
  render() {
    return (
      <div className='my-component'>
        Test 1
        <AnotherComponent someProp="Hooray!" />
      </div>
    );
  }
}

export function renderApp(where) {
  ReactDOM.render(
    <App />,
    where
  );
}