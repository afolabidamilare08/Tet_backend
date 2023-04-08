const { Joierrorformat } = require("../err/error_edit");
const Sector = require("../models/sectors_model");
const User = require("../models/user_model");
const { validateAddSector, validateAddUser } = require("../validators/formsValidator");

const router = require("express").Router();

// This router adds the sectors to the database
router.post('/add_sector', async (req,res) => {

    const { error, value } = validateAddSector(req.body)

    if (error) {
        return res.status(400).json(Joierrorformat(error.details[0]))
    }

    const sector_name = value.sector_name
    const sector_sub = value.sector_sub

    const NewSector = new Sector({
        sector_name,
        sector_sub
    })

    NewSector.save()
        .then( (Saved) => {
            return res.status(201).json(Saved)
        } )
        .catch( (err) => {
            return res.status(403).json(err)
        } )

} )

// This router gets all the sectors from the database

router.get('/get_sectors', async (req,res) => {

    Sector.find()
        .then( (thesectors) => {
            return res.status(200).json(thesectors)
        } )
        .catch( (err) => {
            return res.status(403).json(err)
        } )

} )



// This Router is to save user and their details
router.post('/save_user', async (req,res) => {

    const { error, value } = validateAddUser(req.body)

    if (error) {
        return res.status(400).json(Joierrorformat(error.details[0]))
    }

    User.findOne({"name":value.name})
        .then( (TheName) => {

            if ( TheName ) {
                return res.status(403).json("User with this name already exist")
            }

            const name = value.name
            const sectors = value.sectors
            const agree_to_terms = value.agree_to_terms
        
            const NewUser = new User({
                name,
                sectors,
                agree_to_terms
            })
        
            NewUser.save()
                .then( (saved) => {
                    return res.status(200).json(saved)
                } )
                .catch( (err) => {
                    return res.status(403).json(err)
                } )

        } )
        .catch((err) => {
            return res.status(403).json(err)
        })

} )


// This Router is to get users and their details
router.post('/get_user', async (req,res) => {

    const nameTofind = req.body.name

    console.log(nameTofind)

    User.findOne({"name":nameTofind})
        .then( (UserFound) => {

            if(!UserFound){
                return res.status(403).json("Username Dose not exist")
            }

            return res.status(200).json(UserFound)
        } )
        .catch((err) => {
            return res.status(403).json(err)
        })

} )



// This Router is to update the user
router.put('/update_user', async (req,res) => {

    const { error, value } = validateAddUser(req.body)

    if(error){
        return res.status(400).json(Joierrorformat(error.details[0]))
    }

    User.findOne({"name":value.name})
        .then( (UserFound) => {

            if(!UserFound){
                return res.status(403).json({error_message:"Username Dose not exist"})
            }

            const name = value.name
            const sectors = value.sectors
            const agree_to_terms = value.agree_to_terms

            User.findOneAndUpdate({"name":value.name},
            {
                $set:{
                    name:name,
                    sectors:sectors,
                    agree_to_terms:value.agree_to_terms
                }
            },{ new:true }).then( (UpdatedUser) => {
                return res.status(200).json(UpdatedUser)
            } )
            .catch((err) => {
                return res.status(403).json(err)
            })

        } )
        .catch((err) => {
            return res.status(403).json(err)
        })

} )




module.exports = router