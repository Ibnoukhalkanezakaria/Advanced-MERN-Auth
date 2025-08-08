import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

export const mailtrapClient = new MailtrapClient({
  token: "427a698f18492d9ef28490c28d787d25",
  endpoint: "https://send.api.mailtrap.io/",
});

export const sender = {
  email: "hello@demomailtrap.co",
  name: "zibnoukh",
};
// const recipients = [
//   {
//     email: "ibnoukhalkanezakaria@gmail.com",
//   },
// ];

// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     html: "<h1>Congrats for sending test email with Mailtrap!</h1>",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);

// Note:    Make sure to replace <
// 2320787
// 4ef60887c72f9392e3f60379fd9721fb
