import Resolver from '@forge/resolver';
import api,{ route } from '@forge/api';
// import { skyAndGroundWidth } from './utils/constants';

const resolver = new Resolver();
const requiredSummary = 50;
const requiredDescription = 4;

resolver.define('getText', async (req) => {
  console.log(req);
  console.log('issue key ${req.context.extension.issue.key}');
//  const response   = async () => {
    const res = await api.asApp().requestJira(route`/rest/api/3/issue/${req.context.extension.issue.key}/`);
    const data = await res.json(); 
    // setIssue(data);
    var summaryScore = data.fields.summary.length/requiredSummary;
    if (summaryScore > 1){
      summaryScore = 1;
    }
    var descScore = data.fields.description.content.length/requiredDescription;
    if (descScore > 1){
      descScore = 1;
    }
    var updated = data.fields.updated ;
    const calculateHoleLength = (updated) => {
      // calculate hole length based on the progress of the issue
      const createdAt = new Date(updated);
      const now = new Date();
      const timeInProgress = now - createdAt;
      const holeLength = timeInProgress / (1000 * 60 * 60); // hours
      return holeLength;
    }

// };
  return  (calculateHoleLength)/2 * 100;
});

export const handler = resolver.getDefinitions();
