export default {
  axiosConfig: () => {
    return {
      baseURL: "http://localhost:3000",
      timeout: 10000,
      responseType: 'json'
    }
  },
}