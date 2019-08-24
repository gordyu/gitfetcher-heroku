import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import './style.css';
import dudeUrl from './img/codingCat.gif';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    };
    this.getTopTwentyFive = this.getTopTwentyFive.bind(this);
  }

  getTopTwentyFive() {
    $.ajax({
      method: 'GET',
      url: '/repos.json',
      success: (result) => {
        this.setState({
          repos: result
        });
      }
    });
    // .done(function (result) {
    //   // console.log('GET repos.json, result" ', result);
    //   this.setState({
    //     repos: result
    //   });
    // });
  }

  componentDidMount() {
    this.getTopTwentyFive();

    // easter egg
    let dudeDiv = document.createElement('div');
    dudeDiv.id = 'codingCat';
    let dudeImg = document.createElement('img');
    dudeImg.src = dudeUrl;
    dudeImg.alt = 'codingCat';
    dudeDiv.appendChild(dudeImg);
    document.querySelector('h4').appendChild(dudeDiv);
    const keySequence = [
      'ArrowUp', 'ArrowUp',
      'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight',
      'ArrowLeft', 'ArrowRight',
      'b', 'a',
    ];
    let userInput = new Array(keySequence.length);
    window.addEventListener('keydown', ({ key }) => {
      userInput = [...userInput.slice(1), key];
      if (keySequence.every((v, k) => v === userInput[k])) {
        window.scroll({
          top: 0,
          behavior: 'instant'
        });
        $('#codingCat').fadeIn(3000, function () {
          window.setTimeout(function () {
            $('#codingCat').fadeOut(4000);
          }, 4000);
        });
      }
    });

    // $.ajax({
    //   method: 'GET',
    //   url: '/repos.json'
    // })
    //   .done(function (result) {
    //     // console.log('GET repos.json, result" ', result);
    //     that.setState({
    //       repos: result
    //     });
    //   });
  }

  search(term) {
    console.log(`${term} was searched`);
    // TODO
    $.ajax({
      method: 'POST',
      url: '/repos',
      data: { term: term }
    })
      .done( (msg) => {
        console.log('Search term posted to server: ' + msg);
        // window.location.reload();
        this.getTopTwentyFive();
      });
  }

  render() {
    return (
      <div id="layout" className="pure-g">
        <div className="sidebar pure-u-1 pure-u-md-1-4">
          <div className="header">
            <h1 className="brand-title">Github Fetcher</h1>
            <h2 className="brand-tagline">Add more repos!</h2>
            <Search onSearch={this.search.bind(this)} />
          </div>
        </div>
        <RepoList repos={this.state.repos} />
      </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));