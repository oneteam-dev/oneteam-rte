import React, { Component } from 'react';
import Editor from './Editor';

export default class App extends Component {
  render() {
    return (
      <div>
        <Editor onMount={c => this.rte = c} />
        <button onClick={() => console.log(this.rte.serializedHTML)}>Log</button>
      </div>
    );
  }
}
