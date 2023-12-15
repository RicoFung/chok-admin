<script setup lang="ts">
import { ref, onMounted } from "vue";
import { message } from "@/utils/message";
import { initRouter, getTopMenu } from "@/router/utils";
import { type DataInfo, setOAuth2Token } from "@/utils/auth";
import { fetchOAuth2Data } from "@/utils/oauth2-enhanced";
import { jwtDecode } from "jwt-decode";

defineOptions({
  name: "OAuth2 Authorized Enhanced"
});

const oauth2Data: DataInfo<number> = {
  accessToken: "",
  expires: null, // Expires in 1 hour
  refreshToken: "",
  username: "",
  roles: [""]
};
const oauth2DataText = ref<string | null>(null);

onMounted(async () => {
  await getOAuth2Data();
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
      oauth2Data.username = jwtDecode(oauth2Data.accessToken)["sub"];
      oauth2DataText.value = JSON.stringify(oauth2Data);
      console.log("oauth2Data <= ", oauth2DataText.value);
      // 缓存 access_token
      setOAuth2Token(oauth2Data);
      // 获取后端路由
      initRouter().then(() => {
        console.log("TopMenu: ", getTopMenu(true).path);
        window.location.href =
          window.location.protocol +
          "//" +
          window.location.host +
          "/#" +
          getTopMenu(true).path;
        message("登录成功", { type: "success" });
      });
    } else {
      message("登录失败", { type: "error" });
      console.error("The OAuth2 Data is null !");
    }
  } else {
    message("授权码为空", { type: "error" });
    console.error("The authorization_code is null !");
  }
};
</script>

<template>
  <div class="flex justify-center items-center h-[640px]">
    <h1>Redirect ......</h1>
  </div>
</template>
