<template>
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
    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
</template>

<script>
  export default {
  	methods: {
      fileLoaded (res) {
        this.photo = "http://localhost:3000/api/profile/photo"
      },
      checkSize (file) {
        //500KB
        const maxSize = 500000

        if (file.size > 500000) return
      },
    }
  }
</script>
