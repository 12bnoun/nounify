import OpenseaContractAddr from './OpenseaContractAddr';
const OS_API = "https://api.opensea.io/api/v1/asset/";

const PFPService = {
  fetchImg: (collection, id) => {

    const options = { method: "GET" };
    //return fetch(`${OS_API}${OpenseaContractAddr[collection.toLowerCase()]}/${id}`, options)
    return {
      url: `${OS_API}${OpenseaContractAddr[collection.toLowerCase()]}/${id}`,
      options,
    }
  }
};

export default PFPService;
