import { mailtrapClient, sender } from "./mailTrapConfig.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  console.log("sendVerificationEmail : ", verificationToken, email);
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationToken}",
        verificationToken
      ),
      category: "Email Verification",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.error(`Error sending verification`, error);

    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];

  try {
    // const response = await mailtrapClient.send({
    //   from: sender,
    //   to: recipient,
    //   template_uuid: "1fae470d-6ce5-4ca2-8891-d1595740d5cc",
    //   template_variables: {
    //     company_info_name: "Test_Company_info_name",
    //     name: name,
    //   },
    // });

    // console.log("Email sent successfully", response);
    console.log("Email sent successfully");
  } catch (error) {
    console.error(`Error sending verification`, error);
    // throw new Error(`Error sending verification email: ${error}`);
  }
};
