import field640 from './media/field-640.webp';
import field1000 from './media/field-1000.webp';
import field1600 from './media/field-1600.webp';
import fieldJpg from './media/field.jpg';
import school600 from './media/school-600.webp';
import school900 from './media/school-900.webp';
import schoolJpg from './media/school.jpg';
export const media = {
 hero: {src:fieldJpg,srcSet:`${field640} 640w, ${field1000} 1000w, ${field1600} 1600w`,alt:'Cultivated rows and irrigation lines beneath an open sky on school land in Kenya.'},
 field: {src:schoolJpg,srcSet:`${school600} 600w, ${school900} 900w`,alt:'Crops growing in a field with school buildings and trees beyond.'},
};
