var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Profesor = require("./models/Profesor"),
  Fakultet = require("./models/Fakultet"),
  User = require("./models/User"),
  cors = require("cors"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose"),
  methodOverride = require("method-override");
// Bodyparser Middleware

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
// Set up a whitelist and check against it:
var whitelist = ['http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// Then pass them to cors:
app.use(cors(corsOptions));
app.use(express.json());
// Connect to Mongo

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, {
    useNewUrlParser: true
  }) // Adding new mongo url parser
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride("_method"));
// Use Routes

/*********************************************************/
//PASSPORT CONFIGURATIONgit
app.use(
  require("express-session")({
    secret: "bilo sta mozes ovdje napisat nije bitno",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session(User.authenticate()));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
/*********************************************************/

app.use("/", require("./routes/index"));
app.use("/profesor", require("./routes/profesor"));
app.use("/fakulteti", require("./routes/fakultet"));
// Add headers



/* app.use('/profesors', require('./routes/profesors'));
app.use('/fakultets', require('./routes/fakultets')); */
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));