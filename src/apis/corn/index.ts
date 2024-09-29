import request from "@/servers";
// 设置定时任务执行间隔

export const startScheduledPush = () => {
  return request({
    url: `/cron/start_schedule_push`,
    method: "get",
  });
};

// 关闭定时任务
export const stopScheduledPush = () => {
  return request({
    url: `/cron/stop_schedule_push`,
    method: "get",
  });
};
