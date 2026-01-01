// Project Images - Using actual project screenshots
import claritasImg from './claritas.png';
import proofnImg from './proofn.png';
import auzunoImg from './azuno.png';
import pokeImg from './poke.png';
import bmcmsImg from './bmcms.png';
import fptAcademyImg from './fams.jpg';
import everytalkImg from './everytalk.png'; 
import uobongImg from './uobong.png';   
import beinoivceImg from './ipa.png';
import ipaCompanies from './beinvoice.png';

// Export the imported images
export const claritasImage = claritasImg;
export const proofnImage = proofnImg;
export const auzunoImage = auzunoImg;
export const uobongImage = uobongImg;
// For projects that don't have images yet, using fallback images
export const everytalkImage = everytalkImg; // Using fallback until everytalk.png is added
export const buildingMaintenanceImage = bmcmsImg;
export const pokeLifeImage = pokeImg;
export const fptAcademyImage = fptAcademyImg;

// IPA/Bizzi screenshots served from public/projects
// Place files under: public/projects/ipa-login.png and public/projects/ipa-companies.png
export const ipaLoginImage: string = beinoivceImg;
export const ipaCompaniesImage: string = ipaCompanies;


// To use your actual project images:
// 1. Save your project screenshots as .jpg files in src/assets/projects/
// 2. Import them like this:
// import buildingMaintenanceImg from '../assets/projects/building-maintenance.jpg';
// import pokeLifeImg from '../assets/projects/poke-life.jpg';
// import fptAcademyImg from '../assets/projects/fpt-academy.jpg';
// import examScheduleImg from '../assets/projects/exam-schedule.jpg';
// import claritasImg from '../assets/projects/claritas.jpg';
// import proofnImg from '../assets/projects/proofn.jpg';
// import auzunoImg from '../assets/projects/auzuno.jpg';
// 3. Export them:
// export const buildingMaintenanceImage = buildingMaintenanceImg;
// export const pokeLifeImage = pokeLifeImg;
// etc.
