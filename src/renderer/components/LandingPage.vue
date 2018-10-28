<template>
  <div id="wrapper">

    <div v-if="printNoStart" class="fake-title-bar">
      QRCode - {{ version }}
      <div class="handle-bar" v-if="os === 'win32'">
        <i class="el-icon-minus" @click="minimizeWindow"></i>
        <i class="el-icon-close" @click="closeWindow"></i>
      </div>
    </div>

    <img v-if="printNoStart" id="logo" src="~@/assets/logo.png" alt="electron-vue">
    <main>
      <div class="left-side">

        <div v-if="printNoStart" class="qr-config">

          <el-alert v-if="tips"
            :title="tips"
            type="error"
            center
            show-icon>
          </el-alert>
          <el-form :inline="true" ref="form"  label-width="80px">

            
            
            <el-row>
            <el-form-item label="主标题">
            <el-input
              placeholder="请输入主标题"
              v-model="mainTitle"
              size="mini"
              clearable>
            </el-input>
            </el-form-item>
            <el-form-item label="主字体Size">
            <el-input-number
              placeholder="请输入大小px"
              :precision="2"
              :step="0.1"
              v-model="mainTitleFontSize"
              size="mini"
            >
            </el-input-number>
            </el-form-item>
            </el-row>

            <el-row>
            <el-form-item label="副标题">
            <el-input
              placeholder="请输入副标题"
              v-model="subTitle"
              size="mini"
              clearable>
            </el-input>
            </el-form-item>
            <el-form-item label="副字体Size">
            <el-input-number
              placeholder="请输入大小px"
              :precision="2"
              :step="0.1"
              v-model="subTitleFontSize"
              size="mini"
            >
            </el-input-number>
            </el-form-item>
            </el-row>


            <el-row>
              <el-form-item label="内容一">
              <el-input
                placeholder="请输入内容"
                v-model="valuePrefix"
                size="mini"
                clearable>
              </el-input>
              </el-form-item>

            <el-form-item label="内容二">
              <el-input
                placeholder="请输入内容"
                v-model="valueMid"
                size="mini"
                >
              </el-input>
              </el-form-item>
              </el-row>

              <el-row>
              <el-form-item label="起始数">
              <el-input-number
                placeholder="请输入起始数"
                v-model="valueLast"
                :min=1
                size="mini"
                >
              </el-input-number>
              </el-form-item>

              <el-form-item label="内容字体">
              <el-input-number
                placeholder="请输入大小px"
                :precision="2"
                :step="0.1"
                v-model="valueFontSize"
                size="mini"
              >
              </el-input-number>
              </el-form-item>
            </el-row>
            <!-- <el-form-item label="脚注">
            <el-input
              maxlength=16
              placeholder="请输入内容"
              v-model="footValue"
              size="mini"
              clearable>
            </el-input>
            </el-form-item> -->

            
            <el-form-item label="数量">
            <el-input-number
              placeholder="请输入数量"
              v-model.number="count"
              size="mini"
              :min="1" :max="5000"
              >
            </el-input-number>
            </el-form-item>

            <el-form-item label="大小">
              <el-input-number
                placeholder=""
                v-model.number="size"
                size="mini"
                :step="5"
                :min="30" :max="1000"
                >
              </el-input-number>
            </el-form-item>

            <el-form-item label="每行数量">
              <el-input-number
                placeholder=""
                v-model.number="colCount"
                size="mini"
                :step="1"
                :min="1" :max="10"
                >
              </el-input-number>
            </el-form-item>

            <el-form-item>
              <div
                id="upload-area"
                :class="{ 'is-dragover': dragover }" @drop.prevent="onDrop" @dragover.prevent="dragover = true" @dragleave.prevent="dragover = false"
              >
                <div id="upload-dragger" @click="openUplodWindow">
                  <i class="el-icon-upload"></i>
                  <div class="upload-dragger__text">
                    <span>更换Logo</span>
                  </div>
                  <input type="file" id="file-uploader" @change="onChange" multiple>
                </div>
              </div>
            </el-form-item>


            <el-form-item>
            <!-- <el-button  size="mini" type="primary" round @click="generateQrcode">生成</el-button> -->
            <!-- <el-button  size="mini" type="primary" round @click="printContent2">打印</el-button> -->
            <el-button  size="mini" type="primary" round @click="printContent">打印预览</el-button>
            </el-form-item>

            

           </el-form>


           

        </div>
        
          
          
        <!-- <system-information></system-information> -->
      </div>

      <div class="right-side">
        <div class="doc" id="doc">
          <!-- <div class="title">二维码</div> -->

          <!-- <span v-if="size>=30 && size<=1000" class="qr-area"> -->

          <!-- {{rowCount}} -->
          <table class="table" v-if="rowCount">
            <tr v-for="rIndex in rowCount" class="qr-item" :key="rIndex">
              <!-- <td v-for="(n,index) in lastNoAry.length" class="qr-item"> -->
              <td v-for="cIndex in colCount" class="qr-item" :key="(rIndex-1) + '-' + (cIndex-1)">
                <!-- {{(rIndex-1) + '-' + (cIndex-1)}} -->
                <div v-if="lastNoAry[(rIndex-1)*colCount + (cIndex-1)]">
                  <div v-bind:style="{ color: mainTitleColor, fontSize: mainTitleFontSize + 'px' }">{{mainTitle}}</div>
                  <div  v-bind:style="{ color: subTitleColor, fontSize: subTitleFontSize + 'px' }" >{{subTitle}}</div>
                  <vue-qr  :logoSrc="uploadLogo?uploadLogo:imagePath" :text="valuePrefix + '-' + valueMid+'-'+lastNoAry[(rIndex-1)*colCount + (cIndex-1)]" :size="size" :margin="0"></vue-qr>
                  <span v-bind:style="{ fontSize: valueFontSize + 'px' }">{{valuePrefix + '-' + valueMid + '-' + lastNoAry[(rIndex-1)*colCount + (cIndex-1)]}}</span>
                </div>
              </td>
            </tr>
          </table>
          
          <!-- </div> -->
          
          <!-- <span v-else>请填写二维码参数</span> -->


        </div>

      </div>
    </main>
  </div>
</template>

<script>
import pkg from '../../../package.json'
import VueQr from 'vue-qr'
import _ from 'lodash'
import { remote } from 'electron'

const { BrowserWindow } = remote

export default {
  name: 'landing-page',
  data () {
    return {
      version: process.env.NODE_ENV === 'production' ? pkg.version : 'Dev',
      os: '',
      dragover: false,
      printNoStart: true,
      subTitleColor: 'black',
      mainTitleColor: 'black',

      imagePath: require('../assets/test2.png'),
      filter: 'color',
      footValue: '哇咔咔',
      size: 150,
      count: 1,
      mainTitle: 'FEDERAL MINISTRY OF TRANSPORT ATION',
      subTitle: 'ROAD CRIME CONTROL SYSTEM',
      mainTitleFontSize: 150 / 17,
      subTitleFontSize: 150 / 17,

      valuePrefix: '内容一',
      valueMid: '内容二',
      valueLast: 100,
      valueLastWidth: 4,
      valueFontSize: 14,

      uploadLogo: null,

      lastNoAry: [],
      colCount: 5
    }
  },
  components: { VueQr },
  watch: {
    valueLast: function (val) {
      let sumNum = val + this.count
      if (String(sumNum).length <= this.valueLastWidth) {
        this.getLastNoAry()
      }
    },
    count: function (val) {
      let sumNum = val + this.valueLast
      if (String(sumNum).length <= this.valueLastWidth) {
        this.getLastNoAry()
      }
    }
  },
  computed: {
    // mainTitleFontSize: function () {
    //   return this.size / 17
    // },
    // subTitleFontSize: function () {
    //   return this.size / 15
    // }
    // lastAry: function () {
    //   console.log(this.lastAry)
    //   return [1, 2, 3]
    // },

    // colCount: function () {
    //   return 5
    // },
    tips: function () {
      let sumNum = this.valueLast + this.count
      if (String(sumNum).length > this.valueLastWidth) {
        return '起始数和数量的总和不能超过9999'
      }
      return ''
    },
    rowCount: function () {
      console.log(this.count % this.colCount)
      if (this.count % this.colCount === 0) {
        return parseInt(this.count / this.colCount)
      }
      return parseInt(this.count / this.colCount) + 1
    }
  },
  created () {
    this.os = process.platform
    this.getLastNoAry()
    // this.randomText()

    // const uploadLogoFile = this.$db.read().get('uploadLogoFile').value()
    /* console.log(uploadLogoFile)
    if (uploadLogoFile) {
      this.uploadLogo = window.URL.createObjectURL(uploadLogoFile)
    } */
  },
  mounted () {
    this.$electron.ipcRenderer.on('printEnd', function (event, path) {
      // console.log('On printEnd: ', this, event)
      this.printNoStart = true
    })
  },
  methods: {
    getLastNoAry () {
      this.lastNoAry = _.range(this.valueLast, this.valueLast + this.count).map(i => _.padStart(i, this.valueLastWidth, '0'))
      console.log(this.lastNoAry)
    },
    randomText () {
      let midNoAry = _.range(1000).map(i => _.padStart(i, 3, '0'))
      midNoAry = _.shuffle(midNoAry)

      let lastNoAry = _.range(10000).map(i => _.padStart(i, 4, '0'))
      lastNoAry = _.shuffle(lastNoAry)

      this.randNoStr = midNoAry.map((i, index) => i + '-' + lastNoAry[index])

      // console.log(this.randNoStr)
    },
    minimizeWindow () {
      const window = BrowserWindow.getFocusedWindow()
      window.minimize()
    },
    closeWindow () {
      const window = BrowserWindow.getFocusedWindow()
      window.close()
    },
    open (link) {
      this.$electron.shell.openExternal(link)
    },
    generateQrcode () {
      // window.getSelection().removeAllRanges()
      // let selection = window.getSelection()
      // let range = document.createRange()
      // let target = document.getElementById('doc')
      // range.selectNode(target)
      // selection.addRange(range)
    },
    printContent (e) {
      // window.getSelection().removeAllRanges()
      // let selection = window.getSelection()
      // let range = document.createRange()
      // let target = document.getElementById('doc')
      // range.selectNode(target)
      // selection.addRange(range)

      this.printNoStart = false
      setTimeout(() => {
        // console.log('xxx')
        this.$electron.ipcRenderer.send('printToPdf')
        setTimeout(() => {
          this.printNoStart = true
        }, 1000)
      }, 1000)
      // let subOutputRankPrint = document.getElementById('doc')
      // console.log(subOutputRankPrint.innerHTML)
      // let newContent = subOutputRankPrint.innerHTML
      // let oldContent = document.body.innerHTML
      // document.body.innerHTML = newContent
      // window.print()
      // window.location.reload()
      // document.body.innerHTML = oldContent
      // return false
    },
    printContent2 (e) {
      this.$electron.ipcRenderer.send('printTox')
    },

    onDrop (e) {
      this.dragover = false
      this.ipcSendFiles(e.dataTransfer.files)
    },
    openUplodWindow () {
      document.getElementById('file-uploader').click()
    },
    onChange (e) {
      this.ipcSendFiles(e.target.files)
      document.getElementById('file-uploader').value = ''
    },
    ipcSendFiles (files) {
      let sendFiles = []
      Array.from(files).forEach((item, index) => {
        let obj = {
          name: item.name,
          path: item.path
        }
        // console.log('forEach', item, window.URL.createObjectURL(item))
        sendFiles.push(obj)
      })
      // console.log('sendFiles', files)
      this.uploadLogo = window.URL.createObjectURL(files[0])
      // sendFiles[0].path
      this.$db.read().set('uploadLogoFile', files[0])
        .write()
      this.$electron.ipcRenderer.send('uploadChoosedFiles', sendFiles)
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Source Sans Pro', sans-serif;
}

tr {
  display: block;
}
table {
  page-break-inside: avoid;
}
/* @media print {
  #qr-table {
    page-break-before: always;
  }
} */
.whiteTitle {
  font-size: 4vw;
}
.qr-area {
  /* text-align: center; */
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  justify-content: space-between;
}
.qr-item {
  margin: 0.5%;
  padding: 0.5%;
  background: #fff;
  /* background-image: url('~@/assets/logo.png'); */
  /* background-size: 100% 100%; */
  /* background-repeat: no-repeat; */
  box-sizing: border-box;
}

.el-form-item__label {
  color: #eee;
}
#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(0, 0, 0, 1) 40%,
    rgba(131, 130, 130, 0.9) 100%
  );
  box-sizing: border-box;
  height: 700px;
  padding: 10px 10px;
  width: 100%; /* 100vw;*/
}

#logo {
  height: auto;
  margin-bottom: 5px;
  width: 80px;
}

main {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

main > div {
  flex-basis: 50%;
}

.left-side {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
}
.right-side {
  /* flex: 4; */
  text-align: center;
}

.title {
  /* color: #d7dde2; */
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
}

.doc {
  /* margin-left: 20px; */
  /* background: #1d1c1c; */
  background: #fff;
  min-height: 410px;
}

.fake-title-bar {
  -webkit-app-region: drag;
  height: 22px;
  width: 100%;
  text-align: center;
  color: #eee;
  font-size: 12px;
  line-height: 22px;
  position: fixed;
  z-index: 100;
}
.handle-bar {
  position: absolute;
  top: 2px;
  right: 4px;
  width: 40px;
  z-index: 10000;
  -webkit-app-region: no-drag;
}
.handle-bar i {
  cursor: pointer;
  font-size: 16px;
}

.handle-bar {
  padding-right: 5px;
}
.handle-bar .el-icon-minus:hover {
  color: #409eff;
}
.handle-bar .el-icon-close:hover {
  color: #f15140;
}

#upload-area {
  height: 40px;
  border: 2px dashed #dddddd;
  border-radius: 8px;
  text-align: center;
  width: 70px;
  margin: 0 auto;
  color: #dddddd;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
#upload-area #upload-dragger {
  height: 100%;
}
#upload-area #upload-dragger.is-dragover,
#upload-area #upload-dragger:hover {
  border: 2px dashed #a4d8fa;
  background-color: rgba(164, 216, 250, 0.3);
  color: #fff;
}
#upload-area i {
  font-size: 20px;
  margin-top: 2px;
  line-height: 20px;
  display: block;
}
#upload-area span {
  color: #409eff;
}
#upload-area #file-uploader {
  display: none;
}
.el-row {
  height: 33px;
}
.upload-dragger__text {
  margin: -14px;
  font-size: 10px;
}
</style>
