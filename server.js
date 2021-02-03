const express = require('express');
const app = express();
const { ROLE, users } = require('./data');
const projectRouter = require('./router/projects')
const { authUser, authRole } = require('./auth')
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(setUser);
app.use('/projects', projectRouter)


app.get('/', (req, res) =>{
    res.send('Home Page');
});

app.get('/dashboard', authUser, (req, res) =>{
    res.send('Dashboard Page');
});

app.get('/admin', authUser, authRole(ROLE.ADMIN),  (req, res) =>{
    res.send('Admin Page');
});


function setUser(req, res, next) {
    const userId = req.body.userId;
    if (userId) {
        req.user = users.find(user => user.id === userId)
        //A variavel fica disponivel para os outros middleware
    }
    next()
}


app.listen(port, () => console.log(`listening on http://localhost:${port}`));
