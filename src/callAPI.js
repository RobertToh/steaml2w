const   axios = require("axios");


const fetchProfileHours = async (id, vanity) => {
    try {
        let res_get = await axios.get(process.env.REACT_APP_APIURL + "/users/" + id + "?vanity=" + vanity);
        
        if (Array.isArray(res_get.data) && res_get.data.length === 0) {
            //No profile data was found, try to generate data
            let res_post = await axios.post(process.env.REACT_APP_APIURL + "/users/", {id: id, vanity: vanity});

            if (Array.isArray(res_post.data) && res_post.data.length === 0) {
                //Profile is private or does not exist
                return [];
            }
            else if (res_post.status === 500) {
                //Error
                return null;
            }
            else {
                return res_post.data;
            }
        }
        else if (res_get.status === 500) {
            //Error
            return null;
        }
        else {
            return res_get.data;
        }
    }
    catch (error) {
        console.log(error);
    }
}

//fetchProfileHours("76561198066104727").then(res => console.log(res));
export {fetchProfileHours};