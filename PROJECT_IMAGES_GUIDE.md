# Project Images Setup Guide

## Current Status
The portfolio now uses a centralized image management system. Currently, placeholder Unsplash images are being used.

## How to Replace with Your Actual Project Screenshots

### Step 1: Prepare Your Images
1. Save your project screenshots as .jpg files
2. Recommended dimensions: 800x400 pixels (2:1 aspect ratio)
3. Optimize images for web (keep file size under 500KB each)

### Step 2: Add Images to Assets
Place your project images in the `src/assets/projects/` folder with these names:
- `building-maintenance.jpg` - Building Maintenance and Crack Monitoring System
- `poke-life.jpg` - Poke Life Food Management  
- `fpt-academy.jpg` - FPT Fresher Academy Training Management
- `exam-schedule.jpg` - Exam Schedule Management System
- `claritas.jpg` - Claritas project
- `proofn.jpg` - Proofn project
- `auzuno.jpg` - Auzuno project

### Step 3: Update the Image Imports
Edit `src/assets/projectImages.ts` and replace the placeholder URLs with actual imports:

```typescript
// Replace the placeholder URLs with these imports:
import buildingMaintenanceImg from './projects/building-maintenance.jpg';
import pokeLifeImg from './projects/poke-life.jpg';
import fptAcademyImg from './projects/fpt-academy.jpg';
import examScheduleImg from './projects/exam-schedule.jpg';
import claritasImg from './projects/claritas.jpg';
import proofnImg from './projects/proofn.jpg';
import auzunoImg from './projects/auzuno.jpg';

export const buildingMaintenanceImage = buildingMaintenanceImg;
export const pokeLifeImage = pokeLifeImg;
export const fptAcademyImage = fptAcademyImg;
export const examScheduleImage = examScheduleImg;
export const claritasImage = claritasImg;
export const proofnImage = proofnImg;
export const auzunoImage = auzunoImg;
```

### Step 4: Test
Run `npm run dev` to see your changes in development mode.

## Project Mapping
Based on the screenshots you shared:
- **Claritas**: The company management interface screenshot
- **Proofn**: The mobile app screenshot with the orange Proofn logo
- **Company of Good Summit**: Could be used for any relevant project

## Benefits of This Setup
- ✅ Images are properly bundled by Vite
- ✅ Automatic optimization and cache busting
- ✅ TypeScript support
- ✅ Easy to maintain and update
- ✅ Fallback images if files are missing
