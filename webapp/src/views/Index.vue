<template>
  <div style="height: 100%; width: 100%;">

    <div v-if="!connected" style="padding: 20px; color: #666;">
      <p>{{ statusText }}</p>
      <p v-if="errorMsg" style="color: red;">{{ errorMsg }}</p>
    </div>

    <div v-if="connected">
      <el-tabs v-model="activeDocumentType">
        <el-tab-pane label="零件" name="PartDocument" :disabled="activeDocumentType !== 'PartDocument'"></el-tab-pane>
        <el-tab-pane label="装配" name="AssemblyDocument" :disabled="activeDocumentType !== 'AssemblyDocument'"></el-tab-pane>
      </el-tabs>

      <template>
        <component :is="currentPane"></component>
      </template>
    </div>

  </div>
</template>

<script>
import { ccPlugin } from "../util/CcPluginManager";
import messageTip from "../design/MessageTip";
import commandManager from "../util/CommandManager";
import PartPlugins from "./examples/part/PartPlugins.vue";
import AssemblyPlugins from "./examples/AssemblyPlugins.vue";
import DrawingPlugins from "./examples/DrawingPlugins.vue";

export default {
  components: {
    PartPlugins,
    AssemblyPlugins,
    DrawingPlugins
  },
  data() {
    return {
      activeDocumentType: '',
      connected: false,
      statusText: '正在连接 CrownCAD...',
      errorMsg: '',
    }
  },
  mounted() {
    try {
      ccPlugin.connect((result) => {
        try {
          let docName = result.docInfo.name;
          let docType = result.docInfo.type;
          messageTip.successTip("插件初始化完成。当前文档名称: " + docName);
          commandManager.docType = docType;
          this.activeDocumentType = docType;
          this.connected = true;
        } catch (e) {
          this.errorMsg = '数据解析错误: ' + e.message;
          this.statusText = '连接失败';
        }
      }).catch(err => {
        this.errorMsg = '连接失败: ' + (err?.message || err);
        this.statusText = '连接失败';
      });
    } catch (e) {
      this.errorMsg = 'SDK 加载失败: ' + e.message;
      this.statusText = '初始化失败';
    }
  },
  methods: {

  },
  computed: {
    currentPane() {
      switch (this.activeDocumentType) {
        case "PartDocument":
          return PartPlugins;
        case "AssemblyDocument":
          return AssemblyPlugins;
        // case "DrawingDocument":
        //   return DrawingPlugins;
        default:
          return PartPlugins;
      }
    }
  }
}
</script>

<style scoped>

</style>