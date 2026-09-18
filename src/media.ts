import hero from './media/joyful-photo.webp';
import heroSmall from './media/joyful-photo-800.webp';
import school from './media/school-day.webp';
import schoolSmall from './media/school-day-800.webp';
import nutrition from './media/school-nutrition.webp';
import nutritionSmall from './media/school-nutrition-800.webp';
import opportunity from './media/local-opportunity.webp';
import opportunitySmall from './media/local-opportunity-800.webp';
import learning from './media/lasting-learning.webp';
import learningSmall from './media/lasting-learning-800.webp';
const asset=(src:string,small:string,alt:string,width=1168,height=880)=>({src,srcSet:`${small} 800w, ${src} ${width}w`,alt,width,height});
export const media={
 hero:asset(hero,heroSmall,'AI-generated illustrative scene of Kenyan school friends laughing together over lunch outdoors.',1344,752),
 school:asset(school,schoolSmall,'AI-generated illustrative scene of children enjoying a bright day in a modest Kenyan public-school courtyard.',1344,752),
 priorities:[
 asset(nutrition,nutritionSmall,'AI-generated illustrative scene of Kenyan public-school pupils enjoying a maize-and-bean lunch.'),
 asset(opportunity,opportunitySmall,'AI-generated illustrative scene of young Kenyan adult women working together in an outdoor vegetable nursery.'),
 asset(learning,learningSmall,'AI-generated illustrative scene of a Kenyan teacher helping pupils learn together at shared classroom desks.')
 ]
};
