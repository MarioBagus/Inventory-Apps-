const { INTEGER, INET } = require('sequelize')
const {item} = require('../models')

class ItemController{

    static getItems(req,res){
       item.findAll()
       .then(result =>{
          res.json(result)
       })
       .catch(err=>{
         console.log(err)
       })
    }
    static delete(req,res){
        let id = +req.params.id
        item.destroy({
            where: {
                id
            }
        }).then(result=>{
            res.json(result)
        }).catch(err=>{
            res.json(error)
        })
    }
    static update(req,res){
        let id = +req.params.id
       // res.json(id)
        let {name,type,price,stock} = req.body
       item.update({
            name,type,price,stock
        },{
            where:{
                id
            }
        }
        ).then(result=>{
            res.json(result)
        })
        .catch(err=>{
            res.json(err)
        }) 
    }
    static add(req,res){
        const {name,type,price,stock} = req.body
        res.json(req.body)
        item.create({
            name,type,price,stock
         })
        .then(result=>
            res.json(result)
         )
        .catch(err =>{
            console.log(err)
        })
    }
}


module.exports = ItemController