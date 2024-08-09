'use client';
import Cookies from "universal-cookie";
import { Otp_auth } from '../../api/authapi';
import axios from 'axios';
import { getSiteURL } from '../get-site-url';
import axiosInstance from '../AxiosInstance';
class AuthClient {
  async signInWithOtp(params) {
    const {
      otp,
      user_id,
      uuid
    } = params;
    const authResponse = await Otp_auth(otp, user_id, uuid);
    if (authResponse.token) {
      // Store the token securely (e.g., in localStorage or a cookie)
      const cookies = new Cookies(null, {
        path: "/"
      });
      const options = {
        path: "/" // cookie path
      };
      cookies.set("token", authResponse.token, options);
      localStorage.setItem('authToken', authResponse.token);
      // Proceed with authenticated requests
    } else if (authResponse.error) {
      // console.error('OTP authentication failed:', authResponse.error);
    }
    return authResponse;
  }
  async signInWithOAuth(_) {
    return {
      error: 'Social authentication not implemented'
    };
  }
  async getUser() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return {
        data: null
      };
    }
    try {
      const response = await axiosInstance.get(`${getSiteURL()}api/v1/auth/profie`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return {
        data: response.data.User
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          error: error.response?.data.message || error.message
        };
      } else if (error instanceof Error) {
        return {
          error: error.message
        };
      } else {
        return {
          error: 'An unknown error occurred'
        };
      }
    }
  }
  async signOut() {
    localStorage.removeItem('authToken');
    return {};
  }
}
export const authClient = new AuthClient();