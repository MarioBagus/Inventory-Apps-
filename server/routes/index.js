const route = require('express').Router()

route.get('/', (req,res)=>{
    res.json({
        message: "Home page"
    })
})

const itemRoutes = require('./item');
route.use('/items',itemRoutes);

module.exports = route;