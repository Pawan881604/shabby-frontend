import axios from 'axios';
export const axios_error= (error) =>{
    if (axios.isAxiosError(error)) {
        return { error: error.response?.data.message || error.message };
      } else if (error instanceof Error) {
        return { error: error.message };
      } else {
        return { error: 'An unknown error occurred' };
      }
  }

