export const deepCopy = object => JSON.parse(JSON.stringify(object));


export const generateUserNode = userData => {
  return userData;
};

export const generateOpportunityNodes = opportunitiesData => {
  return opportunitiesData;
};

export default {generateUserNode, generateOpportunityNodes};
