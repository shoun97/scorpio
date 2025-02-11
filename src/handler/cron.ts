import cron from "node-cron";

export const triggerProcess = (schedule: string, process: Function) => {
  const job = cron.schedule(schedule, () => {
    process();
  });

  job.start();
};
