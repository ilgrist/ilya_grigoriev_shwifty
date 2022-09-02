import { UserMsgTypes } from '../utils/constants';

export const userMsgService = { showError, sendUserMsg };

function showError({ error = new Error(), msg = '' }) {
  console.log(msg, error);
  const userMsg = { type: UserMsgTypes.error, msg };
  sendUserMsg(userMsg);
}

function sendUserMsg({ type = 'info', msg = '' }) {
  console.log(type, msg);
}
