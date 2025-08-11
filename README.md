# Kha (Kane) Nguyen - Software Engineer Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS, showcasing my work as a Full-Stack Software Engineer.

![Portfolio Preview]!(image.png)

## 🚀 Features

- **Responsive Design**: Fully responsive across all devices
- **Dark/Light Theme**: Toggle between themes with smooth transitions
- **Smooth Animations**: Powered by Framer Motion for engaging user experience
- **SEO Optimized**: Meta tags and Open Graph data for better search visibility
- **Fast Performance**: Built with Vite for lightning-fast development and builds
- **Type Safe**: Full TypeScript implementation
- **Modern Stack**: React 18, TypeScript, Tailwind CSS, and React Router

## 🛠️ Built With

- **Frontend Framework**: [React 18](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📂 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation header with theme toggle
│   └── Footer.tsx      # Site footer with contact info
├── pages/              # Route-based page components
│   ├── HomePage.tsx    # Landing page with hero section
│   ├── AboutPage.tsx   # About me and skills
│   ├── ProjectsPage.tsx # Project showcase with filtering
│   ├── ExperiencePage.tsx # Work experience timeline
│   ├── EducationPage.tsx # Education and certifications
│   └── ContactPage.tsx # Contact form and information
├── contexts/           # React context providers
│   └── ThemeContext.tsx # Dark/light theme management
├── data/              # Static data and types
│   └── portfolio.ts   # Portfolio data and TypeScript interfaces
├── App.tsx            # Main app component with routing
├── main.tsx          # App entry point
└── index.css         # Global styles and Tailwind imports
```

## 🚦 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the website.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 📝 Customization

### Updating Portfolio Data

All portfolio content is stored in `src/data/portfolio.ts`. To customize the website with your information:

1. **Personal Information**: Update the `personalInfo` object with your details
2. **Work Experience**: Modify the `workExperience` array
3. **Projects**: Update the `projects` array with your project details
4. **Skills**: Customize the `skills` object with your technical skills
5. **Education**: Update the `education` array
6. **Certifications**: Modify the `certifications` array

### Styling Customization

- **Colors**: Update the color palette in `tailwind.config.js`
- **Fonts**: Modify font families in the Tailwind config
- **Animations**: Customize animations in `src/index.css`

### Adding New Sections

1. Create a new page component in `src/pages/`
2. Add the route to `src/App.tsx`
3. Update the navigation in `src/components/Header.tsx`

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy the project**
   ```bash
   vercel
   ```

4. **Configure domain** (optional)
   Follow Vercel's instructions to set up a custom domain.

### Deploy to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)
   - Or connect your GitHub repository for continuous deployment

### Deploy to GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deployment script** to `package.json`:
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

## 🔧 Environment Variables

Create a `.env` file in the root directory for any environment-specific configurations:

```env
VITE_SITE_URL=https://your-domain.com
VITE_CONTACT_EMAIL=your-email@domain.com
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Kha (Kane) Nguyen**
- Email: nguyenxuankha5371@gmail.com
- LinkedIn: [linkedin.com/in/kha-nguyen-29732a209](https://www.linkedin.com/in/kha-nguyen-29732a209)
- GitHub: [github.com/KaneNguyen03](https://github.com/KaneNguyen03)

## 🙏 Acknowledgments

- Design inspiration from modern portfolio websites
- Icons provided by [Lucide](https://lucide.dev/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
- Built with [Vite](https://vitejs.dev/) and [React](https://reactjs.org/)

---

⭐ Star this repository if you found it helpful!
