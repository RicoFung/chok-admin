<script setup lang="ts">
import { buildOAuth2Url } from "@/utils/oauth2-enhanced";
import { openWindow } from "@/components/ReWindow";

defineOptions({
  name: "OAuth2"
});

const clickAuthCode = async () => {
  const authUrl = await buildOAuth2Url();
  // 跳转式
  // window.location.href = authUrl;
  // 弹窗式
  openWindow({ url: authUrl });
};
</script>

<template>
  <div>
    <h1>OAuth2 AUTHORIZATION_CODE_PKCE</h1>
    <el-button
      type="primary"
      @click="clickAuthCode"
      v-motion
      :initial="{
        opacity: 0,
        y: 100
      }"
      :enter="{
        opacity: 1,
        y: 0,
        transition: {
          delay: 500
        }
      }"
    >
      授权码模式（ENHANCED）
    </el-button>
  </div>
</template>
