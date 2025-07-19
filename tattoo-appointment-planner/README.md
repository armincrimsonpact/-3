# Next.js Template

A modern, responsive web application template built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## Features

- **Next.js 15** with App Router
- **React 19** with latest features
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Responsive Design** that works on all devices
- **SEO Optimized** with proper meta tags
- **Performance Optimized** with modern best practices
- **Clean Architecture** with modular components

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd nextjs-template
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── layout/           # Layout components
│   ├── ui/              # UI components
│   └── sections/        # Page sections
├── lib/                  # Utility functions
├── public/              # Static assets
└── types/               # TypeScript types
```

## Customization

### Branding
- Update the brand name in `components/layout/main-nav.tsx`
- Change colors in `tailwind.config.js`
- Update metadata in `app/layout.tsx`

### Content
- Modify the homepage content in `app/page.tsx`
- Add new pages in the `app/` directory
- Update navigation links in `components/layout/main-nav.tsx`

### Styling
- Customize colors in `tailwind.config.js`
- Modify global styles in `app/globals.css`
- Update component styles as needed

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Deployment

This template is ready for deployment on platforms like:
- Vercel (recommended)
- Netlify
- Railway
- Any Node.js hosting platform

## License

This template is open source and available under the [MIT License](LICENSE).

## Support

For questions or support, please open an issue in the repository.
