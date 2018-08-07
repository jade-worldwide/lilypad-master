import axios from "axios";
import url from "url";
// import { SSL_OP_NO_QUERY_MTU } from "constants";
// axios.defaults.withCredentials = true;

export default {
  // Gets all properties
  getProperties: function (query) {
    const urlPath = url.format({
      protocol: "http",
      hostname: "localhost",
      port: "3000",
      pathname: "/results/"
    })

    const dbQuery = {}

    if (query) {
      if (query.city === '' || query.state === '') {
        delete query.city
        delete query.state
      }
      if (query.pets === "Any") {
        delete query.pets

      }
      Object.assign(dbQuery, {
        city: query.city,
        state: query.state,
        price: {
          $gte: query.minPrice,
          $lte: query.maxPrice
        },
        propertySize: {
          $gte: query.minSqFeet,
          $lte: query.maxSqFeet
        },
        numOfBeds: {
          $gte: query.minBeds,
          $lte: query.maxBeds
        },
        numOfBaths: {
          $gte: query.minBaths,
          $lte: query.maxBaths
        },
        pets: query.pets
      })
    }

    console.log('dbQuery ->', dbQuery)
    console.log('query ->', query)
    return axios.post(urlPath, { dbQuery })
  },

  // Gets the Property with the given id
  getProperty: function (id) {
    return axios.get("/property/" + id);
  },
  // Gets the Application with the given id
  getApplication: function (id) {
    return axios.get("/application/" + id);
  },
  // Deletes the Property with the given id
  deleteProperty: function (id) {
    return axios.delete("/manager/properties/delete" + id);
  },
  // Saves a Properties to the database
  saveProperty: function (propertyData) {
    console.log("In Axios route")
    return axios.post("/manager/property/create", propertyData)
  },
  // Saves a Applications to the database
  saveApplication: function (applicationData) {
    console.log("In Axios route")
    return axios.post("/renter/application/create", applicationData)
  },
  saveLike: function (propertyData) {
    console.log("Saving Like")
    return axios.post("/propertyLike", propertyData);
  },
  loginUser: function (userData) {
    console.log('we are sssending a POST request to users/login')
    return axios.post("/api/users/login", userData);
  },
  saveUser: function (userData) {
    console.log("Registering Account")
    return axios.post("/api/users/register", userData);
  },
  getAuthenticated: function (isAuthenticated) {
    console.log('Checking if youre logged in Yo')
    return axios.get("/api/users/authenticated", isAuthenticated);
  },
  logout: (cb) => {
    return axios.post('/api/users/logout', cb);
  },
  // Gets the User with the given id
  getUser: function (id) {
    return axios.get("/api/users/manager/" + id);
  },
  sendApplication: (data) => axios.put('/renter/application/request', data),
  sendProductTaste: (data) => axios.put('/api/users/update', data)
};