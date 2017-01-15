/**
 * Created by ThinkPad on 2017/1/15.
 */

export default {
  incrementAsync ( context ) {
    setTimeout( ()=>{
      context.commit( "increment" )
    }, 1000 )

  }
}
