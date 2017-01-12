/**
 * Created by ThinkPad on 2017/1/11.
 */
const express = require( "express" )
const router =  express.Router()

router.use( "/user", require( "./users" ) )

module.exports = router


