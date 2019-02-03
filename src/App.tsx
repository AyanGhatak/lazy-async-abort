import  Button from '@material-ui/core/Button';
import * as React from 'react';
import { Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import './App.css';
import { DataNetworkService } from './DataNetworkService';

class App extends React.Component<{}, { joke: string}> {
  private $filter: Subject<string> = new Subject();

  constructor(props: {}) {
    super(props);
    this.state = { joke: '' };
    this.$filter.pipe(
      map(() => {
        DataNetworkService.controller.abort();
      }),
      switchMap(() => DataNetworkService.fetchJoke())
    ).subscribe((joke) => {
      this.setState(() => ({ joke }));
    })
  }

  public render = () => {
    return (
      <>
        <Button id="button" variant="contained" color="primary" onClick={this.onClickFn}>
          Tell me a joke
        </Button>
        <div className="joke">
          { this.state.joke }
        </div>
      </>
    );
  }

  private onClickFn = () => {
    this.$filter.next();
  }
}

export default App;
