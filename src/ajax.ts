const apiHost = "https://bakesaleforgood.com";

export default {
  async fetchAllDeal() {
    try {
      let response = await fetch(`${apiHost}/api/deals`);
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },
  async fetchDealDetail(dealId: string) {
    try {
      let response = await fetch(`${apiHost}/api/deals/${dealId}`);
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },
  async fetchDealsSearchResult(searchTerm: string) {
    try {
      let response = await fetch(`${apiHost}/api/deals?searchTerm=${searchTerm}`);
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },
};
