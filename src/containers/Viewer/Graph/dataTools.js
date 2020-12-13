function slugify (str) {
  const map = {
    '_' : ' ',
    'a' : 'á|à|ã|â|À|Á|Ã|Â',
    'e' : 'é|è|ê|É|È|Ê',
    'i' : 'í|ì|î|Í|Ì|Î',
    'o' : 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
    'u' : 'ú|ù|û|ü|Ú|Ù|Û|Ü',
    'c' : 'ç|Ç',
    'n' : 'ñ|Ñ'
  };
  for (const pattern in map) {
    str = str.replace(new RegExp(map[pattern], 'g'), pattern);
  }
  return str.toLowerCase();
}

function getAverageUSDMonthlyAmount(data) {
  // This value can be get using an API like this https://free.currconv.com/api/v7/convert?q=USD_COP&compact=ultra&apiKey=api_key
  // for this example is avoided for performance reasons
  const cop = 3438;
  let periodicityMultiplier;
  let averageSalary = (
    data.minAmount +
    (data.maxAmount ? data.maxAmount : data.minAmount)
  ) / 2;
  if(data.currency === "COP$"){
    averageSalary = averageSalary / cop;
  }
  switch (data.periodicity) {
    case "yearly":
      periodicityMultiplier = 1 / 12;
      break;
    case "hourly":
      periodicityMultiplier = 8 * 30;
      break;
    default:
      periodicityMultiplier = 1;
  }
  return Math.round(averageSalary * periodicityMultiplier);
}

function getDistance(amount, skillsCount) {
  const multiplier = 100;
  return Math.round(skillsCount * multiplier);
}

export const generateGraphData = (user, opportunities) => {
  const data = {
    nodes: [],
    links: []
  };

  data.nodes.push({
    id: 'user',
    name: user.name,
    image: user.pictureThumbnail,
    professionalHeadline: user.professionalHeadline,
    radius: 25,
    color: '#cddc39',
    stroke: '#cddc39'
  });

  for(let i = 0; i < opportunities.length; i++){
    const opportunity = opportunities[i];
    let skillsCounter = 0;
    if(opportunity.compensation && opportunity.compensation.visible && opportunity.compensation.data.minAmount) {
      const amount = getAverageUSDMonthlyAmount(opportunity.compensation.data);
      data.nodes.push({
        id: opportunity.id,
        compensation: {
          ...opportunity.compensation.data,
          amount: amount
        },
        name: opportunity.objective,
        organization: opportunity.organizations[0],
        image: opportunity.organizations[0] && opportunity.organizations[0].picture,
        skills: opportunity.skills,
        radius: amount / 800,
        color: '#000000',
        stroke: '#fff'
      });
      for (let j = 0; j < opportunity.skills.length; j++) {
        const skill = opportunity.skills[j];
        for (let k = 0; k < user.strengths.length; k++) {
          const strength = user.strengths[k];
          if (slugify(skill.name) === slugify(strength.name)) {
            skillsCounter++;
          }
        }
      }
      if (skillsCounter) {
        data.links.push({
          "source": "user",
          "target": opportunity.id,
          "value": skillsCounter,
          "distance": getDistance(amount, skillsCounter)
        });
      }
    }
  }
  return data;
};

export default {generateGraphData};
