const express = require('express');
const PORT = process.env.PORT || 3000;
const models = require('./models');
const bcrypt = require('bcrypt');
const es6Rendered = require('express-es6-template-engine');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const http = require('http');
require('dotenv').config();

const accountSid= process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);



const app = express();

app.engine('html', es6Rendered);
app.set('views', 'views');
app.set('view engine', 'html')

app.use(express.json());
app.use(express.static(__dirname + "/public"))

app.use(cookieParser())
app.use(session({
  secret: 'tacocat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 60000 * 60
  }
}))

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message('The Robots are coming! Head for the hills!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
}); 

app.get('/', (req, res) => {
    res.render('home');
  })

  app.get('/login', (req, res) => {
    res.render('login');
  })

  app.get('/leadform', (req, res) => {
    res.render('leadform');
  })

  app.get('/signup', (req, res) => {
    res.render('signup');
  })

  app.get('/dashboard', (req, res) => {
    
    if (!req.session.user) {
      res.redirect('/login');
      return;
    }
  //   res.render('dashboard', { locals: { username: req.session.user.username } });
  // })
    
  
    models.Lead.findAll({
      where: {
        user_id: req.session.user.id
      }
    }).then(leads => {
      res.render('dashboard', { locals: { username: req.session.user.username, leads : leads } });
    })
  })
  

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login')
})

app.get('/api/users/', (req, res, next) => {
  models.User.findAll().then((user) => {
    res.json(user)
  })

})

//lead  input form api 
app.post('/api/lead/input', (req, res) =>  {
  
  models.Lead.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    user_id: req.session.user.id
  }).then((lead) => {
    res.json(lead)
  })
})
  
 
  app.post('/api/signup', (req, res) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password) {
        res.json({ error: 'Missing required fields'})
       return;
    }
   

    bcrypt.hash(password, 5, (err, hash) => {
      models.User.create({
        username: username,
        email: email,
        password: hash
      }).then((user) => {
        req.session.user = user;
        res.json({
          success: true,
          user_id: user.id
        })
      }).catch(e => {
        let errors = [];
  
        e.errors.forEach((error) => {
          errors.push(error.message)
        })
  
        res.json({ error: errors })
      })
    })
  })
  

  app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
  
    models.User.findOne({
      where: { username: username }
    }).then((user) => {
      if (!user) {
        res.json({ error: 'no user with that username' })
        return;
      }
  
      bcrypt.compare(password, user.password, (err, match) => {
        if (match) {
        req.session.user = user;
          res.json({ user_id: user.id, success: true })
        } else {
          res.json({ error: 'incorrect password' })
        }
      })
    })
  })
//twilio callback models.sms.create
//app.post()

  app.post('/api/sendsms', (req, res) => {
  
 
  client.messages.create({
    body:req.body.sms,
    from:'+12489889653',
    to:'+14043878862'
})
.then((message) => {
  models.Leadsms.create({
    lead_id: req.body.lead_id,
    sent: req.body.sms,

  }).then(() => { 
    res.json({
     success: true
    })
  })

  console.log(message)
})
.catch((err) => console.log(err));
  })

  app.listen(PORT, () => {
    console.log(`App started in port ${PORT}`)
    })