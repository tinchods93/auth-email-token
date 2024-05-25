import nodemailer from 'nodemailer';
import * as AWS from '@aws-sdk/client-ses';
import dotenv from 'dotenv';
import { UserProfile } from '../users/entities/types/userTypes';
import registrationMailTemplate from './emailTemplate.json';
import emailConfig from './emailConfig.json';

dotenv.config();
// console.log("MARTIN_LOG=> AWS", AWS);
const ses = new AWS.SESClient({
  apiVersion: '2010-12-01',
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY ?? '',
  },
});

const transporter = nodemailer.createTransport({
  SES: { ses, aws: AWS },
});

const buildTemplate = (user: UserProfile) => {
  const html = registrationMailTemplate.html
    .join('')
    .replaceAll('{{companyName}}', emailConfig.companyName)
    .replaceAll('{{mailerPosition}}', emailConfig.mailerPosition)
    .replaceAll('{{mailerName}}', emailConfig.mailerName)
    .replaceAll('{{userName}}', user.name ?? user.email)
    .replaceAll('{{supportMail}}', emailConfig.supportMail);

  const text = registrationMailTemplate.rawText
    .join('')
    .replaceAll('{{companyName}}', emailConfig.companyName)
    .replaceAll('{{mailerPosition}}', emailConfig.mailerPosition)
    .replaceAll('{{mailerName}}', emailConfig.mailerName)
    .replaceAll('{{userName}}', user.name ?? user.email)
    .replaceAll('{{supportMail}}', emailConfig.supportMail);

  return {
    html,
    text,
  };
};

// async..await is not allowed in global scope, must use a wrapper
export default async function emailSender(user: UserProfile) {
  // send mail with defined transport object
  console.log('ASD');
  const template = buildTemplate(user);
  try {
    const mailPayload = {
      from: {
        name: emailConfig.companyName,
        address: emailConfig.emailSender,
      }, // sender address
      to: user.email, // list of receivers
      subject: `Bienvenido a ${emailConfig.companyName} - Confirma Tu Registro`, // Subject line
      text: template.text, // plain text body
      html: template.html, // html body
    };

    const info = await transporter.sendMail(mailPayload);
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.log('MARTIN_LOG=> mailer error', error);
  }
}
