const express = require('express');
const { connect } = require('mongoose');
const { MongoClient } = require('mongodb')
const app = express();
const port = 3000;
const path = require('path')
const bodyParser = require("body-parser");
const VipStatus = require('./models/vipstatus.js');
const databaseToken = "mongodb+srv://Raphael:As213411@rodoro.wzfcq.mongodb.net/RodoCraft?retryWrites=true&w=majority";
const discordBot = require('./bot/discord/index.js');

(async () => {
    await connect("mongodb://localhost:27017", { useNewUrlParser: true, useUnifiedTopology: true }).catch(console.error);
})();

//discordBot.botStart();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/main', (req, res) => {
    res.render('main');
});

app.get('/api/direction/vipstatus/', async (req, res) => {
  try {
    const users = await VipStatus.find();

    res.render("vipstatus", {users});
  } catch (error) {
    console.error(error);
    res.status(500).send('Произошла ошибка сервера');
  }
});

app.post('/api/direction/vipstatus/', async (req, res) => {
  try {
    const users = await VipStatus.find();

    res.render("vipstatus", {users});
  } catch (error) {
    console.error(error);
    res.status(500).send('Произошла ошибка сервера');
  }
});

app.get('/api/direction/vipstatus/edit/:id', async (req, res) => {
    try {
      const userId = req.params.id;

      const user = await VipStatus.findOne({ userId: userId });
  
      if (!user) {
        return res.status(404).send('Пользователь не найден');
      }
  
      res.render("vipstatus_edit", {user});
    } catch (error) {
      console.error(error);
      res.status(500).send('Произошла ошибка сервера');
    }
  });

app.get('/api/direction/vipstatus/add', async (req, res) => {
    try {
      res.render("vipstatus_add");
    } catch (error) {
      console.error(error);
      res.status(500).send('Произошла ошибка сервера');
    }
  });
  
app.post('/api/direction/vipstatus/save/:id', async (req, res) => {
    try {
      const userId = req.params;

      const user = await VipStatus.findOne({ userId: userId.id });

      var vipStatusTools = require('./function/vipStatus/infoLvl.js')
      vipStatusTools.infoLvl(req.body.level, user.lvl, user.userId)
  
      // Нахождение пользователя по его ID и обновление его данных
      await VipStatus.updateOne(
        { userId: userId.id },
        {
          userName: req.body.name,
          lvl: req.body.level,
          exp: req.body.experience,
          balance: req.body.money,
        }
   );
  
      res.redirect('/api/direction/vipstatus/');
    } catch (error) {
      console.error(error);
      res.status(500).send('Произошла ошибка сервера');
    }
  });

app.post('/api/direction/vipstatus/save_add', async (req, res) => {
    try {
      await VipStatus.create(
        {
          userId: req.body.id,
          userName: req.body.name,
          lvl: req.body.level,
          exp: req.body.experience,
          balance: req.body.money,
        }
   );
  
      res.redirect('/api/direction/vipstatus/');
    } catch (error) {
      console.error(error);
      res.status(500).send('Произошла ошибка сервера');
    }
  });

app.get('/api/direction/vipstatus/lvlConfig', (req, res) => {
  const configData = require('./public/json/lvlVipStatus.json');
  res.json(configData);
})

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