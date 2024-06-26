import applyCaseMiddleware from "axios-case-converter"
import axios from "axios"

const options = {
  ignoreHeaders: true 
}

export default applyCaseMiddleware(axios.create({
  baseURL: "http://localhost:3000/api/v1"
}), options)
