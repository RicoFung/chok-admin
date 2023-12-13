<script setup lang="ts">
import { fetchOAuth2Data } from "@/utils/oauth2-standard";
import { ref, onMounted } from "vue";
import { type DataInfo, setToken, removeToken, sessionKey } from "@/utils/auth";

defineOptions({
  name: "OAuth2 Authorized Standard"
});

const oauth2Data: DataInfo<number> = {
  accessToken: "",
  expires: null, // Expires in 1 hour
  refreshToken: "",
  username: "",
  roles: []
};
const oauth2DataText = ref<string | null>(null);

onMounted(async () => {
  // await fetchAccessToken();
});

const getOAuth2Data = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code"); // 获取“code”参数
  if (code) {
    console.log("The authorization_code is:", code);
    const data = await fetchOAuth2Data(code);
    if (data) {
      oauth2Data.accessToken = data["access_token"];
      oauth2Data.refreshToken = data["refresh_token"];
      oauth2Data.expires = data["expires_in"];
      oauth2DataText.value = JSON.stringify(oauth2Data);
    } else {
      console.error("The OAuth2 Data is null !");
    }
  } else {
    console.error("The authorization_code is null !");
  }
};
</script>

<template>
  <div>
    <h1>OAuth2 Authorized Standard</h1>
    <div>
      <el-form-item label="OAuth2Data">
        <el-input
          type="textarea"
          v-model="oauth2DataText"
          placeholder="OAuth2Data"
        />
      </el-form-item>
      <el-button
        type="primary"
        @click="getOAuth2Data"
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
        获取 OAuth2Data
      </el-button>
    </div>
  </div>
</template>
