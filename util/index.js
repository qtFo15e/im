/**
 * Created by ThinkPad on 2017/1/3.
 */

const _ = require( "underscore" )


function realLength( str ) {
    var appendLength = 0
    for ( var  char of str ) {
        var code = char.codePointAt(0)
        if ( !(code >= 0 && code <= 128) ) {
           appendLength++
        }
    }
    return str.length + appendLength
}

function getLastReply( replyArr ) {
  return replyArr[ replyArr.length - 1 ][1]
}

module.exports = {
  realLength,
  getLastReply,
}
