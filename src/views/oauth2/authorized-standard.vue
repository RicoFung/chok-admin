<script setup lang="ts">
import { getAccessToken } from "@/utils/oauth2-standard";
import { ref, onMounted } from "vue";

defineOptions({
  name: "OAuth2 Authorized Standard"
});

const accessToken = ref<string | null>(null);

onMounted(async () => {
  // await fetchAccessToken();
});

const fetchAccessToken = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code"); // 获取“code”参数
  if (code) {
    console.log("The authorization_code is:", code);
    accessToken.value = await getAccessToken(code);
    console.log("The access_token is:", accessToken.value);
  } else {
    console.error("Error fetch authorization_code !");
  }
};
</script>

<template>
  <div>
    <h1>OAuth2 Authorized Standard</h1>
    <div>
      <el-form-item label="Access Token">
        <el-input
          type="textarea"
          v-model="accessToken"
          placeholder="Access Token"
        />
      </el-form-item>
      <el-button
        type="primary"
        @click="fetchAccessToken"
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
        获取 AccessToken
      </el-button>
    </div>
  </div>
</template>
