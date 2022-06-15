import client from "./apiConfig"

export default {
  async test() {
    const url = "/something"
    const res = await client.get(url)
    return res.data
  }
}