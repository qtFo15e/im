<template>
  <div style="margin: auto;width: 370px">
    <el-upload
      :on-success="fileLoaded"
      :before-upload="checkSize"
      action="/api/profile/photoUpload"
      type="drag"
      name="photo"
      :multiple="false"
      :thumbnail-mode="true">
      <i class="el-icon-upload"></i>
      <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">
        <div>只能上传jpg/png文件，且不超过500KB</div>
        <div v-if="tooLarge">请上传小鱼500KB的文件</div>
      </div>
    </el-upload>
  </div>

</template>

<script>
  export default {
  	data(){
  		return {
        tooLarge: false
      }
    },
  	methods: {
      fileLoaded (res) {
//        this.$store.state.photo = '/api/profile/photo/' + this.$store.state.user.email + "#" + Math.random()
      },
      checkSize (file) {
        this.tooLarge = false
        //500KB
        const maxSize = 500000
        debugger
        if (file.size > 500000){
          this.tooLarge = true
          return false
        }
        //todo 成功提示 + 触发改变数据
      },
    }
  }
</script>

<style>
  .el-upload__inner.el-dragger.is-showCover > div > div > div > div > span:nth-child(3),.el-upload__inner.el-dragger.is-showCover > div > div > div > div > span:nth-child(2) {
    display: none;
  }
</style>
