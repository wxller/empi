export const INTERACTION_COLUMNS = [
  {
    title: "交互服务名称",
    dataIndex: "serviceName",
    key: "serviceName",
  },
  {
    title: "数量",
    dataIndex: "total",
    key: "total",
  },
  {
    title: "上游系统",
    dataIndex: "upstream",
    key: "upstream",
  },
  {
    title: "下游系统",
    dataIndex: "downstream",
    key: "downstream",
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
  },
];

export const EMPI_COLUMNS = [
  {
    title: "患者数量",
    dataIndex: "patientCount",
    key: "patientCount",
  },
  {
    title: "数量",
    dataIndex: "registerCount",
    key: "registerCount",
  },
  {
    title: "精确匹配",
    dataIndex: "exactCount",
    key: "exactCount",
  },
  {
    title: "模糊匹配",
    dataIndex: "dimMatch",
    key: "dimMatch",
  },
  {
    title: "匹配率",
    dataIndex: "matchRatio",
    key: "matchRatio",
    scopedSlots: { customRender: "matchRatio" },
  },
];

export const EMPI_USE_COLUMNS = [
  {
    title: "系统",
    dataIndex: "SYSTEM_NAME",
    key: "SYSTEM_NAME",
  },
  {
    title: "调用次数",
    dataIndex: "INVOKE_COUNT",
    key: "INVOKE_COUNT",
  },
  {
    title: "注册人数",
    dataIndex: "REGISTER_COUNT",
    key: "REGISTER_COUNT",
  },
];

export const MONTHS = [
  "1月",
  "2月",
  "3月",
  "4月",
  "5月",
  "6月",
  "7月",
  "8月",
  "9月",
  "10月",
  "11月",
  "12月",
];
