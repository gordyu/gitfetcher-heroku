import React from 'react';

const RepoList = (props) => {

  const listRepos = props.repos.map(repo => {
    return (
      <section className="post" key={repo.id}>
        <p className="post-title"><a href={repo.html_url} >{repo.name}</a></p>
        <p className="post-meta">by <a href={`https://github.com/${repo.owner_login}?tab=repositories`} target="_blank">{repo.owner_login}</a> with {repo.stargazers_count.toLocaleString()} ⭐️</p>
      </section>
    );
  });

  return (
    <div className="content pure-u-1 pure-u-md-3-4">
      <h4> Top Github Repos </h4>
      <p>Top {props.repos.length} repos ranked by stars:</p>
      <div>
        <div className="posts">
          {listRepos}
        </div>
      </div>
    </div>
  );
};

export default RepoList;