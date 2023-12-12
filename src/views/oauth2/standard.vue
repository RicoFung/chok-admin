<script setup lang="ts">
import { buildOAuth2Url } from "@/utils/oauth2-standard";

defineOptions({
  name: "OAuth2"
});

const clickAuthCode = () => {
  const authUrl = buildOAuth2Url();
  window.location.href = authUrl;
};
</script>

<template>
  <div>
    <h1>OAuth2 AUTHORIZATION_CODE</h1>
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
      授权码模式（STANDARD）
    </el-button>
  </div>
</template>
