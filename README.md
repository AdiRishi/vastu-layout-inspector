# Vastu Layout Inspector

A modern web application for analyzing home layouts according to Vastu Shastra principles. Upload layout images and use an interactive compass overlay to understand directional orientations and spatial arrangements in your home or property.

## ✨ Features

- **Image Upload & Storage**: Upload home layout images with automatic local storage persistence
- **Interactive Compass Overlay**: Draggable compass that overlays directional lines on your layout
- **8-Direction Analysis**: Complete compass with North, Northeast, East, Southeast, South, Southwest, West, and Northwest directions
- **Color-Coded Directions**: Each direction has a unique color for easy identification
- **Precise Alignment**: Directional lines extend to container edges for accurate spatial analysis
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Local Persistence**: Images are automatically saved locally and restored on page refresh

## 🧭 How It Works

### Compass Directions & Colors

Each cardinal and intercardinal direction is represented by a unique color:

- **North (N)** - Red (`#dc2626`)
- **Northeast (NE)** - Orange (`#ea580c`)
- **East (E)** - Amber (`#d97706`)
- **Southeast (SE)** - Lime (`#65a30d`)
- **South (S)** - Emerald (`#059669`)
- **Southwest (SW)** - Cyan (`#0891b2`)
- **West (W)** - Violet (`#7c3aed`)
- **Northwest (NW)** - Fuchsia (`#c026d3`)

### Vastu Analysis

The compass overlay helps you analyze:

- **Room Placement**: Understand which rooms are positioned in which directions
- **Element Orientation**: Check the directional alignment of key elements like entrances, kitchen, bedrooms
- **Spatial Relationships**: Visualize how different areas of your home relate to cardinal directions
- **Vastu Compliance**: Assess your layout against traditional Vastu Shastra guidelines

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm (recommended), npm, or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd vastu-layout-inspector
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint for code linting
- `pnpm format` - Format code with Prettier

## 🏗️ Project Structure

```
vastu-layout-inspector/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles and Tailwind CSS
│   │   ├── layout.tsx       # Root layout component
│   │   └── page.tsx         # Main application page
│   ├── components/
│   │   ├── compass/         # Compass overlay components
│   │   │   ├── index.tsx           # Main compass component
│   │   │   ├── compass-center.tsx  # Draggable compass center
│   │   │   ├── compass-lines.tsx   # Directional lines overlay
│   │   │   └── compass-labels.tsx  # Direction labels
│   │   ├── layout-analysis/ # Image analysis components
│   │   │   ├── analysis-header.tsx    # Control buttons header
│   │   │   ├── image-container.tsx    # Image display container
│   │   │   └── instructions-panel.tsx # Usage instructions
│   │   ├── image-upload.tsx # Image upload component
│   │   └── ui/              # Reusable UI components (shadcn/ui)
│   ├── hooks/
│   │   ├── use-container-size.ts  # Container dimension management
│   │   ├── use-drag.ts           # Drag functionality for compass
│   │   └── use-image-storage.ts  # Local storage for images
│   └── lib/
│       └── compass-utils.ts      # Compass calculations and constants
├── public/                  # Static assets
├── package.json
└── README.md
```

## 🎨 Tech Stack

### Frontend Framework

- **Next.js 15** - React framework with App Router and Turbopack
- **React 19** - UI library with latest features
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS 4** - Utility-first CSS framework

### UI Components

- **Radix UI** - Accessible, unstyled component primitives
- **shadcn/ui** - Beautiful, customizable components built on Radix UI
- **Lucide React** - Modern icon library
- **class-variance-authority** - Component variant management

### Features & Utilities

- **Custom Drag System** - Smooth dragging for compass positioning
- **Local Storage API** - Image persistence across sessions
- **Responsive Hooks** - Container size management
- **Mathematical Calculations** - Precise directional line calculations

### Development Tools

- **ESLint** - Code linting and quality assurance
- **Prettier** - Code formatting with import sorting
- **pnpm** - Fast, disk space efficient package manager

## 📱 Usage Guide

### Step 1: Upload Your Layout Image

1. Click on the upload area or drag and drop an image file
2. Supported formats: JPG, PNG, GIF, WebP
3. Your image will be automatically saved locally for future sessions

### Step 2: Position the Compass

1. Once your image loads, you'll see a transparent compass center
2. Click and drag the compass to position it anywhere on your layout
3. The compass represents the center point for directional analysis

### Step 3: Analyze Directions

1. Colored lines extend from the compass center to the edges
2. Each line represents a cardinal or intercardinal direction
3. Use these lines to identify which rooms/areas fall in which directions
4. Compare with Vastu Shastra guidelines for optimal placement

### Step 4: Reset and Adjust

- Use the "Reset Compass" button to return the compass to the center
- Use the "Remove Image" button to clear the current image and upload a new one
- Your image persists automatically and will be restored on page refresh

## 🎯 Use Cases

Perfect for:

- **Homeowners** - Analyze your current home's directional layout
- **Architects & Designers** - Incorporate Vastu principles into designs
- **Vastu Consultants** - Professional layout analysis tool
- **Property Buyers** - Evaluate properties for Vastu compliance
- **Interior Designers** - Plan room arrangements according to Vastu guidelines

## 🔮 Vastu Shastra Context

Vastu Shastra is an ancient Indian architectural science that emphasizes the importance of directional orientation in building design. Key principles include:

- **Entrance Placement**: Ideally in North, Northeast, or East
- **Kitchen Location**: Southeast or Northwest directions
- **Master Bedroom**: Southwest for stability and prosperity
- **Prayer Room**: Northeast for spiritual energy
- **Staircase Position**: Southwest, South, or West directions

This tool helps visualize these directional relationships in your layout.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com/new):

1. Connect your GitHub repository
2. Vercel will automatically detect Next.js and configure the build
3. Deploy with zero configuration

### Other Platforms

You can deploy to any platform that supports Node.js:

1. Build the application: `pnpm build`
2. Start the production server: `pnpm start`

## 📞 Support

If you need help or have questions:

- Open an issue on GitHub
- Check the [Next.js documentation](https://nextjs.org/docs)
- Visit the [React documentation](https://react.dev)
- Learn more about [Vastu Shastra principles](https://en.wikipedia.org/wiki/Vastu_shastra)

## 🔮 Future Enhancements

Potential features for future versions:

- **Multiple Compass Points** - Support for multiple reference points
- **Measurement Tools** - Distance and angle measurements
- **Vastu Guidelines Integration** - Built-in Vastu recommendations
- **Export Functionality** - Save annotated layouts as images
- **Template Layouts** - Pre-designed Vastu-compliant layouts
- **3D Layout Support** - Upload and analyze 3D floor plans
