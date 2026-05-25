<template>
  <div style="height: 100%; width: 100%;">

    <el-tabs v-model="activeDocumentType">
      <el-tab-pane label="零件" name="PartDocument" :disabled="activeDocumentType !== 'PartDocument'"></el-tab-pane>
      <el-tab-pane label="装配" name="AssemblyDocument" :disabled="activeDocumentType !== 'AssemblyDocument'"></el-tab-pane>
      <!--<el-tab-pane label="工程图" name="DrawingDocument" :disabled="activeDocumentType !== 'DrawingDocument'"></el-tab-pane>-->
    </el-tabs>

    <template>
      <component :is="currentPane"></component>
    </template>

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
    }
  },
  mounted() {
    ccPlugin.connect((result) => {
      let docName = result.docInfo.name;
      let docType = result.docInfo.type;
      messageTip.successTip("插件初始化完成。当前文档名称: " + docName);
      commandManager.docType = docType;
      this.activeDocumentType = docType;
      this.connected = true;
    });
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