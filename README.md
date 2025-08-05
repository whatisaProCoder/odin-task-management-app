# Webpack Template Repository

A starter template for web development with Webpack, featuring development, production, and common configurations.

## 📁 Project Structure

```
webpack-template-repo/
├── src/                    # Source files
│   ├── index.js            # Main entry point
│   ├── styles.css          # Global stylesheets
│   ├── template.html       # Page Layout
│   ├── design/             # Design assets
│   ├── fonts/              # Custom font files
│   ├── icons/              # Icon assets
│   │   └── favicon.svg     # Site favicon
│   └── images/             # Image assets
├── js/                     # Modular JavaScript files
├── package.json            # Project dependencies and scripts
├── webpack.common.js       # Shared webpack configuration
├── webpack.dev.js          # Development webpack configuration
└── webpack.prod.js         # Production webpack configuration
```

## 🚀 Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Development server:**

   ```bash
   npm run dev
   ```

   Starts webpack dev server with hot reloading at `http://localhost:8080`

3. **Build for production:**

   ```bash
   npm run build
   ```

   Creates optimized build in `dist/` folder

4. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```
   Deploys the `dist/` folder to gh-pages branch

## 📋 File Descriptions

- **`webpack.common.js`** - Shared configuration used by both development and production builds
- **`webpack.dev.js`** - Development configuration with source maps and dev server, extends `webpack.common.js`
- **`webpack.prod.js`** - Production configuration with optimizations, extends `webpack.common.js`
- **`src/index.js`** - Application entry point, imports CSS and initializes the app
- **`src/template.html`** - Base HTML template processed by HtmlWebpackPlugin
- **`src/styles.css`** - Main stylesheet imported by index.js

## 🛠 Features

- **Webpack 5** with common, development, and production configs
- **CSS processing** with style-loader and css-loader
- **HTML template processing** with html-webpack-plugin
- **Development server** with hot reloading
- **Source maps** for debugging
- **Clean builds** (automatically clears dist folder)
- **GitHub Pages deployment** ready

## 📦 Dependencies

### Production

- `webpack` - Module bundler
- `webpack-cli` - Command line interface for webpack

### Development

- `css-loader` - Resolves CSS imports
- `style-loader` - Injects CSS into DOM
- `html-loader` - Processes HTML files
- `html-webpack-plugin` - Generates HTML files
- `webpack-dev-server` - Development server with live reloading

---

#### **Ready to start building!**

