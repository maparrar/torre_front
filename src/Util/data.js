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
  };
  return str.toLowerCase();
};

export const generateGraphData = (user, opportunities) => {
  const data = {
    nodes: [],
    links: []
  };

  data.nodes.push({
    id: 'user',
    name: user.name,
    pictureThumbnail: user.pictureThumbnail,
    professionalHeadline: user.professionalHeadline
  });

  for(let i = 0; i < opportunities.length; i++){
    const opportunity = opportunities[i];
    let linkValue = 0;
    data.nodes.push({
      id: opportunity.id,
      compensation: opportunity.compensation.data,
      name: opportunity.objective,
      organization: opportunity.organizations[0],
      skills: opportunity.skills
    });
    for(let j = 0; j < opportunity.skills.length; j++){
      const skill = opportunity.skills[j];
      for(let k = 0; k < user.strengths.length; k++){
        const strength = user.strengths[k];
        if(slugify(skill.name) === slugify(strength.name)){
          linkValue++;
        }
      }
    }
    if(linkValue){
      data.links.push({"source": "user", "target": opportunity.id, "value": linkValue});
    }
  }
  return data;
};

export default {generateGraphData};
