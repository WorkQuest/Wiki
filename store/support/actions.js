import {
  error,
  success,
} from '~/utils/helper';

import axios from "axios";

export default {
  async sendSupportMessage(_, payload) {
    try {
      const response = await axios.post('/v1/user-support-ticket/create', payload);
      return success(response.result);
    } catch (e) {
      return error();
    }
  },
};
