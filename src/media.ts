import hero from './media/new-hero.webp';
import heroSmall from './media/new-hero-800.webp';
import school from './media/new-school.webp';
import schoolSmall from './media/new-school-800.webp';
import nutrition from './media/new-nutrition.webp';
import nutritionSmall from './media/new-nutrition-800.webp';
import opportunity from './media/local-opportunity.webp';
import opportunitySmall from './media/local-opportunity-800.webp';
import learning from './media/new-learning.webp';
import learningSmall from './media/new-learning-800.webp';
const asset=(src:string,small:string,alt:string,width=1168,height=880)=>({src,srcSet:`${small} 800w, ${src} ${width}w`,alt,width,height});
export const media={
 hero:asset(hero,heroSmall,'AI-generated illustrative scene of two Kenyan public-school friends chatting during a break, wearing burgundy uniforms.',1344,752),
 school:asset(school,schoolSmall,'AI-generated illustrative scene of blue-uniformed pupils walking through a modest coastal Kenyan public school.',1344,752),
 priorities:[
 asset(nutrition,nutritionSmall,'AI-generated illustrative scene of a Kenyan school lunch of cooked rice, kidney-bean stew and greens on a stainless plate.'),
 asset(opportunity,opportunitySmall,'AI-generated illustrative scene of young Kenyan adult women working together in an outdoor vegetable nursery.'),
 asset(learning,learningSmall,'AI-generated illustrative scene of pupils in tan uniforms learning with their teacher in a Kenyan public-school classroom.')
 ]
};
