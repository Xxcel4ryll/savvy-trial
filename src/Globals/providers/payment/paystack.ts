/* eslint-disable @typescript-eslint/no-var-requires */
import Axios from 'axios';

const config = require('../../../../core/config');

export default class Paystack {
  apiKey = config.payment.paystackPublicKey;
  secretKey = config.payment.paystackSecretKey;
  baseUrl = config.payment.paystackApiUrl;

  paystackAPI = Axios.create({
    baseURL: this.baseUrl,
  });

  /**
   * Paystack Payment constructor
   * @param {{
   *  type: string
   * }} options paystack payment options
   * @param {import('winston').Logger} logger logger instance
   */
  constructor(options = {}) {}

  /**
   * Creates a paystack customer
   * @returns Promise<string>
   */
  async createCustomer(customer) {
    const errorMessage =
      'could not carry out transaction please try again later';

    const user = {
      email: customer.email,
      first_name: customer.firstName,
      last_name: customer.lastName,
      phone: customer.phoneNumber,
    };

    try {
      const { data } = await this.paystackAPI.post('/customer', user, {
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
        },
      });

      if (!data || !data.data) {
        return Promise.reject(errorMessage);
      }

      return data.data;
    } catch (error) {
      return Promise.reject(errorMessage);
    }
  }

  /**
   * Fetch a paystack customer
   * @returns Promise<string>
   */
  async fetchCustomer(customer) {
    const errorMessage =
      'could not carry out transaction please try again later';

    try {
      const { data } = await this.paystackAPI.get(`/customer/${customer}`, {
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
        },
      });

      if (!data || !data.responseBody || !data.responseBody.accessToken) {
        return Promise.reject(errorMessage);
      }

      return data.responseBody;
    } catch (error) {
      return Promise.reject(errorMessage);
    }
  }

  /**
   * Create a dedicated virtual account
   * @returns Promise<string>
   */
  async generateWallet(customer) {
    const errorMessage =
      'could not carry out transaction please try again later';

    const user = {
      customer: customer.code,
      preferred_bank: 'test-bank',
    };

    try {
      const { data } = await this.paystackAPI.post(`/dedicated_account`, user, {
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
        },
      });

      if (!data || !data.data) {
        return Promise.reject(errorMessage);
      }

      return data;
    } catch (error) {
      console.log(error);

      throw new Error(errorMessage);
    }
  }

  async cardDeposit(card) {
    const errorMessage =
      'could not carry out transaction please try again later';

    const user = {
      email: card.email,
      amount: card.amount * 100,
      reference: '' + Math.floor(Math.random() * 1000000000 + 1),
      callback_url: '',
    };

    try {
      const { data } = await this.paystackAPI.post(
        `/transaction/initialize`,
        user,
        {
          headers: {
            Authorization: `Bearer ${this.secretKey}`,
          },
        },
      );

      if (!data || !data.data) {
        return Promise.reject(errorMessage);
      }

      return data;
    } catch (error) {
      throw new Error(errorMessage);
    }
  }

  async verifyTransaction({ reference }) {
    const errorMessage =
      'could not carry out transaction please try again later';

    try {
      const { data } = await this.paystackAPI.get(
        `/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${this.secretKey}`,
          },
        },
      );

      if (!data || !data.data) {
        return Promise.reject(errorMessage);
      }

      return data;
    } catch (error) {
      throw new Error(errorMessage);
    }
  }
}
