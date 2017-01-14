/**
 * Created by ThinkPad on 2017/1/11.
 */
const express = require( "express" )
const router =  express.Router()

router.use( "/user", require( "./users" ) )
router.use( "/profile", require( "./profile" ) )

module.exports = router


