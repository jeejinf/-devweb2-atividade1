import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.json())

var urlencoderParser = bodyParser.urlencoded({
    extended: false
})

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/idade", function (req, res) {
  res.render("index");
});

app.get("/idade/:age", function (req, res) {
  var age = req.params.age;
  res.render("idade", {
    userAge: age,
  });
});

app.get("/media", function (req, res) {
    res.render("media");
  });

app.post("/media", urlencoderParser, function(req, res){
    let nota1 = req.body.campoNota1;
    let nota2 = req.body.campoNota2;
    let nota3 = req.body.campoNota3;

    const peso1 = 2;
    const peso2 = 5;
    const peso3 = 3;

    let mediaPonderada = ((peso1 * nota1) + (peso2 * nota2)+(peso3 * nota3)) / (peso1 + peso2 + peso3)

    var classificacao = ''

    if ((mediaPonderada > 9) && (mediaPonderada <= 10))
      { classificacao = 'A'}
    else if ((mediaPonderada > 8) && (mediaPonderada <= 9))
      { classificacao = 'B'}
    else if ((mediaPonderada > 7) && (mediaPonderada <= 8))
      { classificacao = 'C'}
    else if ((mediaPonderada > 6) && (mediaPonderada <= 7))
      { classificacao = 'D'}
    else if ((mediaPonderada > 5) && (mediaPonderada <= 6))
      { classificacao = 'E'}
    else if ((mediaPonderada >= 0) && (mediaPonderada <= 5))
      { classificacao = 'F'}
    else { classificacao = 'Volte e insira valores válidos.'}
    
    res.render("mediaResultado", {
      media: mediaPonderada,
      classificacao: classificacao
    })
})

app.get("/perfil", function (req, res) {
  res.render("perfil");
});

app.post("/perfil", urlencoderParser, function (req, res) {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let age = req.body.age;
  let country = req.body.country;

  res.render("perfilResultado", {
    firstName: firstName,
    lastName: lastName,
    age: age,
    country: country
  })
});

app.listen(port, () => {
  console.log(`Servidor rodando no site: http://localhost:${port}/`);
  console.log(`mais informações na rota /`);
});