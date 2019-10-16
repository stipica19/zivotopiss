var mongoose = require("mongoose");

var profesorSchema = new mongoose.Schema({
  ime: { type: String, required: true },
  prezime: { type: String, required: true },
  mail: { type: String,  unique: true },

  ustanovaZaposlenja: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Fakultet"
  },

  selectedItems: 
    {
      type: [],
      ref: "Fakultet"
    }
    ,
    studijNaKojimaPredaje: 
    {
      type: [],
      ref: "Studij"
    }
  ,
  datumZadnjegIzboraUZvanje: Date,
  akademskiStupanj: {
    type: String,
    enum: [
      "asistent",
      "visiAsisten",
      "predavac",
      "docent",
      "izvProf",
      "redProf"
    ]
  },
  predmetiKojeIzvodi: [{ naziv: String }],
 
  kratkiZivotopis: String,
  RadoviITakoTo: String,
  popisRadova: String
},{ timestamps: true });

module.exports = mongoose.model("Profesor", profesorSchema);