import axios from 'axios';

const SEND_URL_BASE = 'https://us-central1-fir-crud-app-2a3a9.cloudfunctions.net/sendMail';

type Params = {
  email: string;
  message: string;
};

export const sendMail = async ({ email, message }: Params) => {
  const send_url = SEND_URL_BASE + '?to=' + email + '&msg=' + message;
  axios.get(send_url);
};
