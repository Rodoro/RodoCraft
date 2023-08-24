const express = require('express');
const { connect } = require('mongoose');
const app = express();
const port = 3000;
const path = require('path')
const bodyParser = require("body-parser");
const databaseToken = "mongodb+srv://Raphael:As213411@rodoro.wzfcq.mongodb.net/RodoCraft?retryWrites=true&w=majority";
const discordBot = require('./bot/discord/index.js');
const expressLayouts = require('express-ejs-layouts');

(async () => {
    await connect(databaseToken, { useNewUrlParser: true, useUnifiedTopology: true }).catch(console.error);
})();

discordBot.botStart();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes.js'));

app.use((req, res) => {
  res.status(404);
  res.render('404');
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500);
  res.render('500');
})

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});