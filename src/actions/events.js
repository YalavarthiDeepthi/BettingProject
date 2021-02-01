import axios from "axios";

export const getEvents = async() =>  {
    const response= await axios.get("http://www.mocky.io/v2/59f08692310000b4130e9f71")
    console.log("actions",response)
    return {
        type:"EVENTS",
        payload:response.data
    };
  }

  export const getSideNavData = (data) =>  {
      debugger
    return {
        type:"sideNavData",
        payload:data
    };
  }
