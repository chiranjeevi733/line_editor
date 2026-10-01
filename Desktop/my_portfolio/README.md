# Personal Portfolio Website

A modern, responsive portfolio website for a B.Tech Computer Science Engineering student. The site is built with React and Vite and is designed to be easy to update later.

## Portfolio overview

This portfolio includes:

- Navigation with smooth scrolling
- Hero section with profile image and call-to-action buttons
- About, education, skills, projects, experience, certifications, achievements, and contact sections
- Light and dark theme toggle
- Responsive design for desktop, tablet, and mobile
- Resume and social links placeholders for easy customization

## Technologies used

- React
- Vite
- CSS
- React Icons

## Features

- Clean, professional design
- Reusable project and skill cards
- Editable personal information in one data file
- Mobile-friendly navigation
- Accessible HTML structure and buttons

## Install

```bash
npm install
```

## Run locally

```bash
npm run dev
```

## Build for production

```bash
npm run build
```

## Customize your details

Edit the file:

```bash
src/data/portfolioData.js
```

Update the values for:

- name
- degree
- college
- location
- email
- phone
- GitHub URL
- LinkedIn URL
- resume path
- profile photo path
- skills
- projects
- certifications
- achievements

## Add your profile photo

Place your image in the assets folder:

```bash
src/assets/
```

Then update the `profilePhoto` value in `src/data/portfolioData.js`.

## Add your resume

Place your PDF in:

```bash
public/resume.pdf
```

A placeholder file is already included so the page has a working resume link before your real PDF is added.

## Deploy

This project is ready to deploy on:

- Vercel
- Netlify
- GitHub Pages

### Vercel

1. Push the project to GitHub.
2. Open Vercel and import the repo.
3. Use the default Vite settings.
4. Deploy.

### Netlify

1. Push the project to GitHub.
2. In Netlify, choose Import from Git.
3. Select the repository.
4. Deploy with the default build command.

### GitHub Pages

1. Run `npm run build`.
2. Publish the `dist` folder to GitHub Pages.

## Notes

- The contact form opens the default mail app because no backend email service is configured.
- Replace all placeholders before publishing your portfolio.
- Keep project information truthful and based on your actual work.
