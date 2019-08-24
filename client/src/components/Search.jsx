import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    };
  }

  onChange(e) {
    this.setState({
      term: e.target.value
    });
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  render() {
    return (
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">(enter a github username)</li>
          <li className="nav-item">
            <input id="searchinput" value={this.state.term} onChange={this.onChange.bind(this)} />
            <button className="pure-button" onClick={this.search.bind(this)}> Add Repos </button>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Search;