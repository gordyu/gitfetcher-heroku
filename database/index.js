const mongoose = require('mongoose');
//mongoose.connect('mongodb://127.0.0.1/fetcher', {useNewUrlParser: true});  For local, comment line 3, uncomment line 2.
mongoose.connect(proccess.env.MONGODB_URI); //See https://devcenter.heroku.com/articles/mongolab#getting-your-connection-uri and App -> Settings -> Config Vars

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'DB connection error!'));

db.once('open', function () {
  let repoSchema = mongoose.Schema({
    id: {
      type: Number,
      required: true,
      index: true,
      unique: true
    },
    name: { type: String, required: true, },
    owner_login: { type: String, required: true },
    html_url: { type: String, required: true },
    stargazers_count: { type: Number },
    updated_at: { type: String },
    timestamp: { type: String },
  });

  let Repo = mongoose.model('Repo', repoSchema);

  let save = (data) => {
    // TODO Your code here
    // This function should save a repo or repos to
    // the MongoDB
    console.log('In save');
    let repos = JSON.parse(data);
    // https://mongoosejs.com/docs/models.html#constructing-documents
    repos.forEach(repo => {
      let dt = new Date();
      let eachRepo = new Repo({
        id: repo.id,
        name: repo.name,
        owner_login: repo.owner.login,
        html_url: repo.html_url,
        stargazers_count: repo.stargazers_count,
        updated_at: repo.updated_at,
        timestamp: dt.toISOString()
      });
      eachRepo.save(function(err, repo) {
        if (err) {
          console.error('db save error: ', err);
        }
        // if (repo) {
        //   console.log('Saved repo to db: ', repo.name);
        // }
      });

      // check if repo already exits, if not, save it
      // Repo.find({ id: repo.id }, function (err, found) {
      //   if (err) {
      //     console.error('findById error: ', err);
      //   } else {
      //     console.log('Saving to DB');
      //     console.log('Repo.find found: ', found);
      //     eachRepo.save();
      //   }
      // });
    });
    console.log('Repos saved to DB');
  };
  module.exports.save = save;

  let findTopRepos = (callback) => {
    // query the DB & sort by stars
    Repo.find({})
      .sort({ stargazers_count: 'desc' })
      .limit(25)
      .exec(function (err, docs) {
        if (err) {
          console.error('findTopRepos query error: ', err);
        } else {
          console.log('findTopRepos docs accessed');
          callback(docs);
        }
      });
  };
  module.exports.findTopRepos = findTopRepos;
});
