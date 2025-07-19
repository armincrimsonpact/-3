# Customization Guide

This guide will help you quickly customize the template for your new website by changing colors and text.

## Quick Color Changes

### Primary Color
The main accent color is currently **teal**. To change it:

1. **In `tailwind.config.js`** - Update the primary color:
   ```js
   colors: {
     primary: {
       50: '#f0fdfa',   // Your new color
       500: '#your-color-here',
       600: '#your-darker-color',
     }
   }
   ```

2. **Replace all instances** of `text-teal-500` with `text-[your-color]-500`
3. **Replace all instances** of `bg-teal-500` with `bg-[your-color]-500`
4. **Replace all instances** of `border-teal-500` with `border-[your-color]-500`

### Popular Color Options:
- **Blue**: `text-blue-500`, `bg-blue-500`
- **Purple**: `text-purple-500`, `bg-purple-500`
- **Green**: `text-green-500`, `bg-green-500`
- **Red**: `text-red-500`, `bg-red-500`
- **Orange**: `text-orange-500`, `bg-orange-500`
- **Pink**: `text-pink-500`, `bg-pink-500`

## Text Changes

### Brand Name
1. **In `components/layout/main-nav.tsx`** - Line 47:
   ```tsx
   Your Brand  // Change this
   ```

2. **In `components/layout/footer.tsx`** - Line 89:
   ```tsx
   Your Brand  // Change this
   ```

3. **In `app/layout.tsx`** - Update metadata:
   ```tsx
   title: "Your Brand - Modern Web Application",
   description: "Your brand description here",
   ```

### Homepage Content
**In `app/page.tsx`** - Update these sections:

1. **Hero Section** (lines 10-15):
   ```tsx
   <h1 className="text-6xl font-bold mb-6">
     Welcome to Your Brand Name
   </h1>
   <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
     Your tagline or description here
   </p>
   ```

2. **Features Section** (lines 30-50):
   - Update feature titles and descriptions
   - Change "Modern Stack", "Responsive Design", "Performance Optimized"

3. **About Section** (lines 60-80):
   - Update "About This Template" to "About Your Brand"
   - Change the description text

### Navigation Links
**In `components/layout/main-nav.tsx`** - Update navigation items:
```tsx
{ href: "/", label: "Home" },
{ href: "/about", label: "About" },
{ href: "/services", label: "Services" },
{ href: "/contact", label: "Contact" },
```

### Footer Links
**In `components/layout/footer.tsx`** - Update footer sections:
```tsx
const footerSections = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/services", label: "Services" },
      { href: "/contact", label: "Contact" },
      { href: "/careers", label: "Careers" },
    ],
  },
  // ... other sections
]
```

## Quick Customization Script

Run this PowerShell script to quickly change colors:

```powershell
# Replace teal with your color (e.g., blue, purple, green)
$color = "blue"  # Change this to your preferred color

# Update all files
Get-ChildItem -Recurse -Include "*.tsx", "*.ts", "*.js", "*.css" | ForEach-Object {
    (Get-Content $_.FullName) -replace "teal-500", "$color-500" -replace "teal-600", "$color-600" | Set-Content $_.FullName
}
```

## File Structure for New Pages

To add new pages, create files in the `app/` directory:

```
app/
├── about/
│   └── page.tsx          # About page
├── services/
│   └── page.tsx          # Services page
├── contact/
│   └── page.tsx          # Contact page
├── blog/
│   └── page.tsx          # Blog page
└── page.tsx              # Homepage
```

## Example Page Template

```tsx
import { Footer } from "@/components/layout/footer"
import { MainNav } from "@/components/layout/main-nav"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />
      
      <main className="flex-1 bg-black">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-5xl font-bold text-white mb-8">About Us</h1>
          <p className="text-white text-lg">
            Your content here...
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
```

## Deployment

1. **Install dependencies**: `npm install`
2. **Run development**: `npm run dev`
3. **Build for production**: `npm run build`
4. **Deploy to Vercel**: Connect your GitHub repo to Vercel

## Need Help?

- Check the main README.md for detailed setup instructions
- The template uses Next.js 15 with App Router
- All components are in the `components/` directory
- Styles are in `app/globals.css` and use Tailwind CSS 