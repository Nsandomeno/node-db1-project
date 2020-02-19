// import express
const express = require('express');
// database access using knex
const db = require('../data/dbConfig.js')
// create router 
const router = express.Router();

// route handlers
router.get("/", (req, res) => {
    db("accounts").then((accounts) => {
        res.status(200).json(accounts)
    }).catch((error) => {
        res.status(500).json({message:"Accounts could not be retrieved."})
    })
})

router.get("/:id", (req, res) => {
    const { id } = req.params
    db("accounts").where({ id: id })
        .then((account) => {
            if (account.length === 0) {
                res.status(404).json({message:"An account with this id does not exist."})
            } else {
                res.status(200).json(account)
            }
        })
        .catch((error) => {
            res.status(500).json({error:"Account could not be retrieved."})
        })
})

router.post("/", (req, res) => { 
    const newAccount = req.body
if (!req.body.name || !req.body.budget) {
    res.status(404).json({message:"Please include a name and a budget"})
} else {
    db("accounts").insert(newAccount, "id").then((id) => {
        res.status(201).json(id)
    }).catch((error) => {
        res.status(500).json({message:"The account could not be added."})
    })
}
})

router.put("/:id", (req, res) => {
    const { id } = req.params
    const updateInfo = req.body

if (!req.body.name && !req.body.budget) {
    res.status(404).json({message:"Please provide a name or a budget for the account."})
} else {
    db("accounts").where({ id: id }).update(updateInfo)
        .then((count) => {
            if (count === 1) {
                res.status(200).json(count)
            } else {
                res.status(404).json({message:"An account with this id does not exist."})
            }
        }).catch((error) => {
            res.status(500).json({message:"Account could not be updated."})
        })
    }
})

router.delete("/:id", (req, res) => {
    const { id } = req.params
    
    db("accounts").where({ id: id }).delete()
        .then((count) => {
            if (count === 1) {
                res.status(200).json(count)
            } else {
                res.status(404).json({message:"An account with this id could not be found."})
            }
        }).catch((error) => {
            res.status(500).json({message:"Account could not be deleted."})
        })
})
// export
module.exports = router

//middleware
// const findName = (req, res, next) => {
//     const name = req.body.name

//     db("accounts").where({name: name}).then((account) => {
//         if (account.length !== 0 ) {
//             res.status(404).json({message:"A user with this name already exists."})
//         } else {
//             next()
//         }
//     }).catch((error) => {
//         res.status(500).json({message:"Request could not be complete."})
//     })
// }