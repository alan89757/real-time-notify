// @ts-nocheck
import React from "react";
import { render } from "react-dom";
import 'antd/dist/antd.css';
import App from "@/polling/index";  // 短轮询
// import App from "@/long-polling/index";  // 长轮询
// import App from "@/web-socket/app";  // 长连接
// import App from "@/server-sent-events/app";  // 服务器事件推送sse


render(<App />, document.getElementById("root"));