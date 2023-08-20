const express = require('express');
const { connect } = require('mongoose');
const app = express();
const port = 3000;
const path = require('path')
const bodyParser = require("body-parser");
const VipStatus = require('./models/vipstatus.js');
const databaseToken = "mongodb+srv://Raphael:As213411@rodoro.wzfcq.mongodb.net/RodoCraft?retryWrites=true&w=majority";
const discordBot = require('./bot/discord/index.js');
const { fail } = require('assert');
const vipStatusTools = require('./lib/admin/vipStatus/updateLvl.js')

//TODO 
//+вынести функцию infoLvl в отдельный модуль
//переписать клиентский js
//переписать выдачу лвл, чтобы опыт не обнулялся при получение лвл
//ограничение по количеству лвл от 0 до длины масива
//добавить кнопку на панели вип статуса для изменение конфиг файла связанный с вип статусом
//написать README.md
//сделать обработку того что бд выключена
//разобратся в папке views
//добавить макеты 
//переписать подключение к бд
//переписать маршрутизацию
//переписать файл с токенами
//+перенаправить весь api на admin
//дописать функцию updateLvl
//сделать экспорт полностья модуля а не по одной функци
//добавить поддомены заместо admin

db = true;
(async () => {
    await connect(databaseToken, { useNewUrlParser: true, useUnifiedTopology: true }).catch(console.error, db = false);
})();

//discordBot.botStart();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/admin/', (req, res) => {
    res.render('main');
});

app.get('/admin/direction/vipstatus/', async (req, res) => {
  try {
    const users = null;
    if(db==true){
      users = await VipStatus.find();
    }

    res.render("vipstatus", {users, db});
  } catch (error) {
    console.error(error);
    res.status(500).send('Произошла ошибка сервера');
  }
});

app.post('/admin/direction/vipstatus/', async (req, res) => {
  try {
    const users = await VipStatus.find();

    res.render("vipstatus", {users});
  } catch (error) {
    console.error(error);
    res.status(500).send('Произошла ошибка сервера');
  }
});

app.get('/admin/direction/vipstatus/edit/:id', async (req, res) => {
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

app.get('/admin/direction/vipstatus/add', async (req, res) => {
    try {
      res.render("vipstatus_add");
    } catch (error) {
      console.error(error);
      res.status(500).send('Произошла ошибка сервера');
    }
  });
  
app.post('/admin/direction/vipstatus/save/:id', async (req, res) => {
    try {
      const userId = req.params;

      const user = await VipStatus.findOne({ userId: userId.id });

      vipStatusTools.updateLvl(req.body.level, user.lvl, user.userId)
  
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
  
      res.redirect('/admin/direction/vipstatus/');
    } catch (error) {
      console.error(error);
      res.status(500).send('Произошла ошибка сервера');
    }
  });

app.post('/admin/direction/vipstatus/save_add', async (req, res) => {
    try {
      vipStatusTools.updateLvl(req.body.level, 0, req.body.id)
      await VipStatus.create(
        {
          userId: req.body.id,
          userName: req.body.name,
          lvl: req.body.level,
          exp: req.body.experience,
          balance: req.body.money,
        }
   );
  
      res.redirect('/admin/direction/vipstatus/');
    } catch (error) {
      console.error(error);
      res.status(500).send('Произошла ошибка сервера');
    }
  });

app.get('/admin/direction/vipstatus/config', (req, res) => {
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