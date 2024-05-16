<script setup lang="ts">
import { http } from "@/utils/http";
import { PureTable } from "@pureadmin/table";
import { storageSession } from "@pureadmin/utils";
import { ref } from "vue";

defineOptions({
  name: "Test"
});

const tableColumns: TableColumnList = [
  {
    label: "主键",
    prop: "tcRowid",
    width: "260",
    fixed: true
  },
  {
    label: "编码",
    prop: "tcCode",
    width: "260"
  },
  {
    label: "名称",
    prop: "tcName",
    width: "260"
  }
];

const tableDatas = ref([]);

const clickTestBearer = () => {
  const oauth2DataObj = JSON.parse(storageSession().getItem("oauth2Data"));
  console.log("oauth2Data: ", oauth2DataObj);
  console.log("oauth2Data accessToken: ", oauth2DataObj.accessToken);
  const token = oauth2DataObj.accessToken;

  const url = "/oauth2-resource-server/api/v3_1/customtbdemo/getList";

  const requestData = {
    data: {
      dynamicColumns: ["tcRowid", "tcCode", "tcName"],
      dynamicOrder: [
        {
          sortName: "tcRowid",
          sortOrder: "DESC"
        }
      ],
      dynamicWhere: {
        tcCode: "",
        tcName: "",
        tcRowidArray: []
      },
      page: 1,
      pagesize: 10
    }
  };

  return http
    .request("post", url, requestData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
    .then(res => {
      tableDatas.value = res["resultInfo"];
    })
    .catch(err => {
      console.error("err", err);
    });
};

const clickTest1Bearer = () => {
  const oauth2DataObj = JSON.parse(storageSession().getItem("oauth2Data"));
  console.log("oauth2Data: ", oauth2DataObj);
  console.log("oauth2Data accessToken: ", oauth2DataObj.accessToken);
  const token = oauth2DataObj.accessToken;

  const url = "/oauth2-resource1-server/api/v3/customtbdemo/getList";

  const requestData = {
    data: {
      dynamicColumns: ["tcRowid", "tcCode", "tcName"],
      dynamicOrder: [
        {
          sortName: "tcRowid",
          sortOrder: "DESC"
        }
      ],
      dynamicWhere: {
        tcCode: "",
        tcName: "",
        tcRowidArray: []
      },
      page: 1,
      pagesize: 10
    }
  };

  return http
    .request("post", url, requestData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
    .then(res => {
      tableDatas.value = res["resultInfo"];
    })
    .catch(err => {
      console.error("err", err);
    });
};

const clickTestBasic = () => {
  const url = "/basic-resource-server/domain/customtbdemo/getList1";
  const username = "admin";
  const password = "admin";
  const basic =
    username && password
      ? "Basic " + btoa(username + ":" + password)
      : undefined;

  const requestData = {
    data: {
      dynamicColumns: ["tcRowid", "tcCode", "tcName"],
      dynamicOrder: [
        {
          sortName: "tcRowid",
          sortOrder: "DESC"
        }
      ],
      dynamicWhere: {
        tcCode: "",
        tcName: "",
        tcRowidArray: []
      },
      page: 1,
      pagesize: 10
    }
  };

  return http
    .request("post", url, requestData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: basic
      }
    })
    .then(res => {
      tableDatas.value = res["data"].list;
    })
    .catch(err => {
      console.error("err", err);
    });
};
</script>

<template>
  <div>
    <h1>普通测试</h1>

    <el-button
      type="primary"
      @click="clickTestBearer"
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
      测试 Bearer
    </el-button>

    <el-button
      type="primary"
      @click="clickTest1Bearer"
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
      测试1 Bearer
    </el-button>

    <el-button
      type="primary"
      @click="clickTestBasic"
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
      测试 Basic
    </el-button>

    <pure-table :data="tableDatas" :columns="tableColumns" />
  </div>
</template>
