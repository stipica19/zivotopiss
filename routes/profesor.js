const express = require("express"),
  app = express(),
  router = express.Router(),
  passport = require("passport");
(bodyParser = require("body-parser")),
  (Profesor = require("../models/Profesor")),
  (Fakultet = require("../models/Fakultet")),
  (User = require("../models/User"));
methodOverride = require("method-override");
var passwordGenerator = require("generate-password");
app.use(bodyParser.urlencoded({ extended: true }));

//create route
router.post("/", (req, res) => {
  console.log("doslismo tu");
  const ime = req.body.ime;
  const prezime = req.body.prezime;
  const mail = req.body.mail;
  const selectedItems = req.body.selectedItems;
  const predmetiKojeIzvodi = req.body.predmetiKojeIzvodi;
  const ustanovaZaposlenja = req.body.ustanovaZaposlenja;
  const datumZadnjegIzboraUZvanje = Date.parse(
    req.body.datumZadnjegIzboraUZvanje
  );
  const akademskiStupanj = req.body.akademskiStupanj;

  const studijNaKojimaPredaje = req.body.studijNaKojimaPredaje;
  const kratkiZivotopis = req.body.kratkiZivotopis;
  const RadoviITakoTo = req.body.RadoviITakoTo;
  const popisRadova = req.body.popisRadova;

  const newProfesor = new Profesor({
    ime,
    prezime,
    mail,
    predmetiKojeIzvodi,
    selectedItems,
    ustanovaZaposlenja,
    datumZadnjegIzboraUZvanje,
    akademskiStupanj,
    studijNaKojimaPredaje,
    kratkiZivotopis,
    RadoviITakoTo,
    popisRadova
  });
  Profesor.create(newProfesor, function(err, noviProfesor) {
    if (err) console.log("Error kod dodavanja profesora" + err);
    else {
      var password = passwordGenerator.generate({
        length: 20,
        numbers: true
      });
      var newUser = new User({
        username: noviProfesor.mail,
        profesorId: noviProfesor._id
      });

      User.findOne({ profesorId: noviProfesor._id }, function(err, user) {
        if (user) {
          console.log("Postoji user/profesor vec");
          res.redirect("/profesor/add");
        }
      });
      User.register(newUser, password, function(err, user) {
        console.log(password);
        if (err) {
          console.log(err);
          return res.redirect("/profesor/add");
        } else {
          res.redirect("/");
        }
      });
      console.log("Dodan novi profesor: " + noviProfesor);
    }
  });
  res.redirect("/");
});

//new route
router.get("/add", (req, res) => {
  console.log("tudesemo");
  Fakultet.find({}, (err, sviFakulteti) => {
    console.log(sviFakulteti);
    if (err) {
      console.log(err);
    } else {
      res.json(sviFakulteti);
    }
  });
});

//show route
router.get("/:id", (req, res) => {
  Profesor.findById(req.params.id, function(err, pronadjenProfesor) {
    if (err) {
      console.log("Tražen je nepostojeci korisnik");
      res.redirect("/");
    } else {
      Fakultet.findById(
        pronadjenProfesor.ustanovaZaposlenja,
        (err, pronadjenFakultet) => {
          res.json({ pronadjenProfesor, pronadjenFakultet });
        }
      );
    }
  });
});
//edit route
router.get("/:id/edit", (req, res) => {
  console.log("usli smo u edit duboko");
  Profesor.findById(req.params.id, function(err, pronadjenProfesor) {
    if (err) {
      console.log("Tražen je nepostojeci korisnik");
      res.redirect("/");
    } else {
      res.json({ pronadjenProfesor });
    }
  });
});
//update route
//update route
router.put("/:id", (req, res) => {
  console.log("fsafasfas" + req.params.id);
  const newProfesor = {
    ime: req.body.ime,
    prezime: req.body.prezime,
    mail: req.body.mail,
    selectedItems: req.body.selectedItems,
    predmetiKojeIzvodi: req.body.predmetiKojeIzvodi,
    ustanovaZaposlenja: req.body.ustanovaZaposlenja,
    //  datumZadnjegIzboraUZvanje : Date.parse(req.body.datumZadnjegIzboraUZvanje),
    akademskiStupanj: req.body.akademskiStupanj,
    studijNaKojimaPredaje: req.body.studijNaKojimaPredaje,
    kratkiZivotopis: req.body.kratkiZivotopis,
    RadoviITakoTo: req.body.RadoviITakoTo,
    popisRadova: req.body.popisRadova
  };

  console.log("uslimo duboko u put rikvest");
  console.log("req body je: " + req.body);
  console.log("\nreq body profesor je je: " + req.body.profesor);
  Profesor.findByIdAndUpdate(req.params.id, newProfesor, function(
    err,
    editovanProfesor
  ) {
    if (err) {
      console.log("Tražen je nepostojeci korisnik");
      console.log(err);
      res.redirect("/");
    } else {
      User.findOneAndUpdate(
        { profesorId: req.params.id },
        { username: req.body.mail },
        (err, editovanUser) => {
          if (err) {
            console.log(err);
            console.log("Error kod editovonja prof usera");
          } else {
            console.log("Editovan juzer je " + editovanUser);
            //console.log("User uspjesno editovan: " + editovanUser.username);
          }
        }
      );

      idProfesora = editovanProfesor._id;
      console.log("profesor ažuriran: " + editovanProfesor);
      res.redirect("/profesor/" + editovanProfesor._id);
    }
  });
});

//destroy route
router.delete("/:id", function(req, res) {
  Profesor.findByIdAndDelete(req.params.id, function(err, pobrisanProfesor) {
    if (err) {
      console.log("Tražen je nepostojeci korisnik");
      res.redirect("/");
    } else {
      User.findOneAndRemove(
        { profesorId: pobrisanProfesor._id },
        (err, pobrisanUser) => {
          if (err) {
            console.log("Error delete route for user");
          } else {
            console.log("User je pobrisan: " + pobrisanUser);
          }
        }
      );
      console.log("profesor pobrisan: " + pobrisanProfesor);
    }
  });

  res.redirect("/");
});

function isAdmin(req, res, next) {
  console.log("doslismo na isadmin!!!");
  if (req.user == undefined) {
    console.log("juzer nedefiniran");
    return res.json({ isAdmin: false });
  } else if (req.user.isAdmin == false) {
    console.log("juzer admin je fals");
    return res.json({ isAdmin: false });
  }

  next();
}

function isAdminOrProfesor(req, res, next) {
  if (req.user == undefined) {
    console.log("juzer nedefiniran");
    return res.json({ isAdmin: false });
  } else if (
    req.user.isAdmin == false &&
    req.user.profesorId != req.params.id
  ) {
    console.log("juzer admin je fals");
    return res.json({ isAdmin: false });
  }
  next();
}
module.exports = router;
