import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";


class JoblyApi {
  // Token gets stored here after login/signup
  static token;

  /** Get the current user. */
  static async getCurrentUser(username) {
    try {
      const res = await axios.get(`${BASE_URL}/users/${username}`, {
        headers: { Authorization: `Bearer ${JoblyApi.token}` }
      });
      return res.data.user;
    } catch (err) {
      console.error("API Error in getCurrentUser:", err);
      throw err;
    }
  }

  /** Get companies (filtered by name if provided) */
  static async getCompanies(name) {
    try {
      const res = await axios.get(`${BASE_URL}/companies`, {
        params: { name }
      });
      return res.data.companies;
    } catch (err) {
      console.error("API Error in getCompanies:", err);
      throw err;
    }
  }

  /** Get details on a company by handle. */
  static async getCompany(handle) {
    try {
      const res = await axios.get(`${BASE_URL}/companies/${handle}`);
      return res.data.company;
    } catch (err) {
      console.error("API Error in getCompany:", err);
      throw err;
    }
  }

  /** Get list of jobs (filtered by title if provided) */
  static async getJobs(title) {
    try {
      const res = await axios.get(`${BASE_URL}/jobs`, {
        params: { title }
      });
      return res.data.jobs;
    } catch (err) {
      console.error("API Error in getJobs:", err);
      throw err;
    }
  }

  /** Apply to a job */
  static async applyToJob(username, jobId) {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${BASE_URL}/users/${username}/jobs/${jobId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return res.data.applied;
    } catch (err) {
      console.error("API Error in applyToJob:", err);
      throw err;
    }
  }

  /** Login and get token */
  static async login(data) {
    try {
      const res = await axios.post(`${BASE_URL}/auth/token`, data);
      JoblyApi.token = res.data.token;
      return res.data.token;
    } catch (err) {
      console.error("API Error in login:", err);
      throw err;
    }
  }

  /** Signup and get token */
  static async signup(data) {
    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, data);
      JoblyApi.token = res.data.token;
      return res.data.token;
    } catch (err) {
      console.error("API Error in signup:", err);
      throw err;
    }
  }

  /** Save profile changes */
  static async saveProfile(username, data) {
    try {
      const token = JoblyApi.token;
      const res = await axios.patch(
        `${BASE_URL}/users/${username}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return res.data.user;
    } catch (err) {
      console.error("API Error in saveProfile:", err);
      throw err;
    }
  }
}

export default JoblyApi;
