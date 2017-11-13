import { get } from '../httpMethods.js';

const allSubjects = (success) => { get('/signup/subjects').then(success); }

export { allSubjects };