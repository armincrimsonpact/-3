# Agentic Workflows Product Company

A modern, professional website for an AI-powered workflow automation company. Built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## Features

- **Hero Section** with animated gradient backgrounds using aubergine and warm gold
- **Feature Grid** highlighting AI capabilities with interactive cards
- **Process Steps** showing how the product works
- **Statistics Section** with impressive metrics
- **Professional Navigation** with smooth scrolling
- **Responsive Design** that works on all devices
- **Interactive Elements** with hover effects and animations

## Color Palette

- **Primary Aubergine** (#4a2c4d) - Headers, navigation, and main branding
- **Warm Gold** (#c4975a) - Call-to-action buttons and accents
- **Soft Blush** (#d4af9a) - Background sections and gradients
- **Sage Green** (#8fa68e) - Feature icons
- **Warm White** (#f5f3f0) - Clean backgrounds
- **Charcoal Gray** (#6b7280) - Body text

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Homepage with all sections
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── layout/           # Navigation & footer
│   └── ui/              # UI components
├── public/              # Static assets
└── tailwind.config.js   # Custom color palette
```

## Key Sections

### Hero Section
- Animated gradient background (aubergine to gold)
- Floating animated elements
- Call-to-action buttons with hover effects
- Responsive typography

### Statistics Section
- Key metrics display
- Animated counters
- Icon integration

### Feature Grid
- Interactive cards with hover effects
- AI capability highlights
- Color-coded feature categories

### Process Steps
- Three-step workflow explanation
- Visual connectors between steps
- Gradient background

### Testimonials
- Customer testimonials with ratings
- Professional layout
- Social proof elements

## Interactive Elements

- **Animated floating elements** in the hero
- **Hover effects** on cards and buttons
- **Scroll-triggered animations** using Framer Motion
- **Smooth navigation transitions**
- **Dynamic header background changes**

## Customization

### Colors
The color palette is defined in `tailwind.config.js` and can be easily modified:

```js
colors: {
  aubergine: { /* aubergine color variants */ },
  gold: { /* gold color variants */ },
  blush: { /* blush color variants */ },
  sage: { /* sage color variants */ },
  warm: { /* warm white variants */ },
  charcoal: { /* charcoal gray variants */ },
}
```

### Content
- Update hero text in `app/page.tsx`
- Modify feature descriptions
- Change statistics and testimonials
- Update navigation links in `components/layout/main-nav.tsx`

## Deployment

This project is ready for deployment on platforms like:
- Vercel (recommended)
- Netlify
- Railway
- Any Node.js hosting platform

## Technologies Used

- **Next.js 15** with App Router
- **React 19** with latest features
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons

## License

This project is proprietary to Agentic Workflows Product Company.
