# Polymath - Task Management Application

An intuitive task management application built with modern web technologies and packaged as a desktop application using Electron.

![Polymath App](https://github.com/whatisaProCoder/odin-task-management-app/blob/main/demo/app_preview.png)

## 📚 Table of Contents

- [Introduction](#introduction)
  - [Project Journey](#project-journey)
  - [Next Steps](#next-steps)
- [Features](#features)
- [Architecture](#architecture)
  - [Plain JavaScript Excellence](#plain-javascript-excellence)
  - [Data Flow](#data-flow)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Core Modules](#core-modules)
- [UI Components](#ui-components)
- [Electron Integration](#electron-integration)
- [Getting Started](#getting-started)
- [Build and Deployment](#build-and-deployment)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [Learning Journey](#learning-journey)
- [Acknowledgements](#acknowledgements)

## 🚀 Introduction

Polymath is a task management application designed to help users organize their work efficiently. It provides features for creating projects, adding tasks with different priorities, setting due dates, and tracking completion status. The application uses a modern architecture with a clean separation of concerns between data management and UI components.

### 🧠 Project Journey

Polymath began as a simple To-Do app project for The Odin Project curriculum. This project is part of the JavaScript Course in the "JavaScript Path" section, appearing just before the React section begins. At the time of building this app, I had completed roughly 34% of the JavaScript path. What started as a basic exercise in vanilla JavaScript quickly evolved as I fell in love with building a practical, everyday application:

1. **Core-First Development**: I built the functional core modules first, implementing robust data structures and storage functionality before any UI work began—ensuring a solid foundation
2. **Modular Architecture**: Created a clean, modular codebase with careful separation of concerns between data and presentation layers
3. **Design Phase**: Only after the core functionality was solid, I created a modern UI design in Figma, focusing on clean aesthetics and intuitive interactions
4. **Vanilla JS Challenge**: Despite not reaching the React section of The Odin Project yet, I decided to push forward with pure HTML, CSS, and JavaScript—challenging myself to create a professional application without frameworks
5. **UI Implementation**: Hand-coded every HTML element and CSS rule to pixel-perfectly replicate the Figma designs, without relying on any UI frameworks or component libraries—connecting these meticulously crafted UI modules to the already-functioning core
6. **Desktop Application**: Extended the web app into a desktop application using Electron

This methodical approach—starting with a solid core, designing intentionally, and building a beautiful UI with vanilla technologies—resulted in an application that's not only visually appealing but also robust and maintainable under the hood. It also provided invaluable experience with core web technologies as I continue progressing through The Odin Project curriculum.

What's perhaps most remarkable is that the entire project—from initial Figma design to fully functioning desktop application—was completed in just one intensive week of focused development. This rapid execution demonstrates both efficient workflow and a strong grasp of fundamental web technologies.

### 🔮 Next Steps

This project was completed in just one intensive week, from initial design to desktop application. Having built a solid foundation with vanilla technologies, my immediate focus is:

- **Android Application**: Researching the best approach to develop an Android version of this app. I plan to explore technologies that would allow me to leverage my existing web codebase while providing a native-like experience on mobile devices.

While I could continue expanding Polymath with features like cloud synchronization or analytics, my educational journey requires moving forward with The Odin Project curriculum to master additional web development concepts and technologies. The core skills developed here—particularly in modular architecture and state management—will transfer directly to future learning.

## ✨ Features

- **Project Management**: Create, rename, and delete projects
- **Task Management**: Add, edit, and delete tasks with various attributes
- **Priority Levels**: Assign High, Medium, or Low priority to tasks
- **Due Dates**: Set and track task deadlines
- **Task Details**: Add descriptions and notes to tasks
- **Data Persistence**: All data is saved to localStorage
- **Responsive UI**: Clean, intuitive interface with smooth interactions
- **Desktop Application**: Packaged as an Electron application with custom title bar
- **Cross-Platform**: Works on Windows, macOS, and Linux

## 🏗️ Architecture

Polymath follows a modular architecture with clear separation between:

- **Core Logic**: Handles data management, storage, and business logic
- **UI Components**: Manages the presentation layer and user interactions
- **Desktop Integration**: Provides platform-specific features through Electron

### Plain JavaScript Excellence

What makes Polymath special is its implementation using **100% vanilla JavaScript, HTML, and CSS** without any frameworks. While I initially planned to learn React through The Odin Project curriculum, I decided to challenge myself by pushing the boundaries of what's possible with pure vanilla technologies first.

Or more accurately, I hadn't quite reached the React section yet due to my, uh, _methodical_ learning pace (let's call it that instead of "skill issues" 😅). So in true developer fashion, I thought, "How hard could it be to build everything from scratch?" Turns out, pretty hard—but also incredibly rewarding!

This approach forced me to deeply understand core web concepts and DOM manipulation, resulting in:

- **Superior foundational knowledge**: Mastering the fundamentals before adding framework abstractions
- **Lightweight performance**: No framework overhead means faster loading and execution
- **Full control**: Direct DOM manipulation without framework constraints
- **Practical learning**: Appreciating what frameworks solve by experiencing the challenges firsthand (and occasionally muttering "React would make this so much easier...")
- **Pixel-perfect implementation**: Every element was hand-coded in HTML and CSS to exactly match the Figma designs—no component libraries or CSS frameworks, just pure craftsmanship and attention to detail

This "vanilla-first" approach demonstrates that powerful, modern applications can be built with standard web technologies when combined with clean architecture principles, modular design, and a healthy dose of stubbornness.

### Data Flow

1. **User Interaction**: User interacts with UI components
2. **Event Handling**: UI components call core modules to perform operations
3. **Data Processing**: Core modules process the data and update storage
4. **UI Update**: Core modules return data to UI components which update the view

## 📁 Project Structure

```
polymath/
├── src/                     # Source files (web application)
│   ├── index.js             # Web entry point
│   ├── styles.css           # Global stylesheets
│   ├── template.html        # HTML template
│   ├── fonts/               # Custom font files
│   │   └── Inter.ttf        # Inter font
│   ├── icons/               # Icon assets
│   │   ├── favicon.svg      # Application favicon
│   │   ├── menu_icon.svg    # Menu icons
│   │   ├── priority_icon.svg # Priority indicator icons
│   │   └── ...              # Other UI icons
│   └── js/                  # JavaScript modules
│       ├── core/            # Core logic modules
│       │   ├── cryptography.js       # ID generation utilities
│       │   ├── displayJSON.js        # JSON visualization utility
│       │   ├── storageModule.js      # Local storage management
│       │   ├── taskClass.js          # Task class definitions
│       │   └── taskManager.js        # Task management logic
│       └── ui/              # UI components
│           ├── add_task_dialog.js    # Task creation dialog
│           ├── black_page.js         # Blank page utility
│           ├── custom_popups.js      # Custom dialog utilities
│           ├── edit_task_dialog.js   # Task editing dialog
│           ├── electron_custom_title_bar.js # Electron title bar
│           ├── filtered_page.js      # Filtered task view
│           ├── preview_task_dialog.js # Task preview dialog
│           ├── project_page.js       # Project view
│           ├── scrollbar.js          # Custom scrollbar
│           ├── sidebar.js            # Application sidebar
│           └── welcome_page.js       # Welcome screen
├── index.js                 # Electron main process entry point
├── preload.js               # Electron preload script for security
├── forge.config.js          # Electron Forge configuration
├── app.ico                  # Application icon
├── data.json                # Sample data for development
├── .gitignore               # Git ignore configuration
├── webpack.common.js        # Shared webpack configuration
├── webpack.dev.js           # Development webpack configuration
├── webpack.prod.js          # Production webpack configuration
├── package.json             # Project dependencies and scripts
└── README.md                # Project documentation
```

## 🛠 Technologies

This project showcases what's possible with fundamental web technologies:

- **Vanilla JavaScript**: No frameworks like React or Vue - just pure JavaScript with modular patterns
- **HTML & CSS**: Hand-crafted markup and styling without component libraries, pixel-perfectly matching the Figma designs through meticulous implementation
- **Webpack**: For bundling and building the application
- **LocalStorage API**: For data persistence
- **Electron**: To transform the web app into a desktop application
- **Date-fns**: For date manipulation and formatting
- **Smooth-scrollbar**: For custom scrollbar implementation

For context, this Todo App project appears in the JavaScript Course, specifically in the "JavaScript Path" section of The Odin Project curriculum. It comes toward the end of the JavaScript section, just before the React material begins. At this point in the curriculum, I had completed only about 34% of the JavaScript path, still working through core concepts like ES6 features, modules, and webpack—with a lot more ground to cover before reaching frameworks and advanced topics.

Turns out, pretty challenging when you're manually handling DOM updates that React would manage automatically. But this "skill issue" turned blessing in disguise forced me to really understand the DOM, event delegation, and state management from first principles. Nothing teaches you to appreciate frameworks quite like writing your 100th event listener by hand!

This vanilla JS journey provided a much deeper understanding of core web concepts that will ultimately make me a better developer when I do (finally) get to learn frameworks.

## 🧠 Core Modules

### `storageModule.js`

Manages data persistence using the browser's localStorage API. Key functions:

- `getData(key)`: Retrieves data from localStorage
- `setData(key, dataObject)`: Stores data to localStorage
- `clearAllStorage()`: Clears all data from localStorage

### `taskClass.js`

Defines the structure for Task objects:

- `Task`: Class for creating new task objects
- `ExistingTask`: Class for editing existing task objects with a known ID

### `taskManager.js`

Central manager for all task-related operations. Key functions:

- `addProject(projectName)`: Creates a new project
- `renameProject(projectID, newName)`: Renames an existing project
- `removeProject(projectID)`: Deletes a project
- `addTask(projectID, taskObject)`: Adds a task to a project
- `updateTask(taskID, updatedTaskObject)`: Updates an existing task
- `removeTask(projectID, taskID)`: Removes a task from a project
- `getAllProjects()`: Returns all projects
- `clearAllData()`: Resets all data to default state

### `cryptography.js`

Provides utility functions for generating unique IDs using `crypto.randomUUID()`.

### Additional Data Files

- **`data.json`**: Contains sample data used for development and testing purposes. Can also be used to restore defaults or provide examples to new users.

## 🖼️ UI Components

### Sidebar (`sidebar.js`)

The main navigation panel that displays:

- Application brand
- Add Task button
- Filter categories (Today, Upcoming, Completed)
- Priority filters (High, Medium, Low)
- Project list

### Project Page (`project_page.js`)

Displays all tasks within a project and provides project management options:

- Task list with priority indicators
- Project menu (rename, clear tasks, delete)
- Add Task button

### Filtered Page (`filtered_page.js`)

Displays tasks filtered by specific criteria:

- Today's tasks
- Upcoming tasks
- Completed tasks
- Tasks by priority (High, Medium, Low)

### Dialog Boxes

- **Add Task Dialog** (`add_task_dialog.js`): Form for creating new tasks
- **Edit Task Dialog** (`edit_task_dialog.js`): Form for editing existing tasks
- **Preview Task Dialog** (`preview_task_dialog.js`): Detailed view of a task

### Welcome Page (`welcome_page.js`)

Initial screen displayed to new users:

- Introduction to the application
- Getting started information
- Example projects and tasks

### Blank Page (`black_page.js`)

Utility view displayed when no project is selected or for empty states.

### Custom UI Elements

- **Custom Popups** (`custom_popups.js`): Async confirmation dialogs
- **Scrollbar** (`scrollbar.js`): Smooth custom scrollbar implementation
- **Electron Custom Title Bar** (`electron_custom_title_bar.js`): Custom window controls for the desktop application

## 🖥️ Electron Integration

Polymath can be run as a desktop application using Electron. Key features:

### Main Process Files

- **`index.js`**: The Electron main process entry point that creates the application window, manages application lifecycle, and sets up IPC communication
- **`preload.js`**: Security-focused preload script that safely exposes only specific APIs to the renderer process
- **`forge.config.js`**: Configuration for Electron Forge, defining build targets, packaging options, and publisher settings

### Custom Title Bar (`electron_custom_title_bar.js`)

Implements a custom application title bar with:

- Window title
- Minimize, maximize, and close buttons
- Custom styling to match the application theme

### Desktop Packaging

The application is packaged for desktop platforms using:

- **Electron Forge**: For building and packaging the application
- **Squirrel**: For Windows installer and auto-updates
- **WiX**: For creating Windows MSI installers

## 🚀 Getting Started

### Web Development

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start development server:**

   ```bash
   npm run dev
   ```

   This starts the webpack dev server with hot reloading at `http://localhost:8080`

### Electron Development

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start Electron application:**

   ```bash
   npm run start:electron
   ```

   This launches the application in Electron for development

## 🏗️ Build and Deployment

### Web Build

```bash
npm run build
```

Creates an optimized web build in the `dist/` folder.

### Desktop Application Build

```bash
npm run make
```

Creates platform-specific installers in the `out/make/` directory.

Available makers:

- **Squirrel.Windows**: Creates a Windows installer (.exe)
- **WiX MSI**: Creates a Windows MSI installer
- **ZIP**: Creates a ZIP archive
- **DEB**: Creates a Debian package
- **RPM**: Creates an RPM package

## 📦 Dependencies

### Production Dependencies

- `date-fns`: Date utility library for formatting and manipulating dates
- `smooth-scrollbar`: Custom scrollbar implementation
- `pretty-print-json`: JSON visualization utility
- `sweetalert2`: Modern popup/alert library
- `electron-squirrel-startup`: Handles Squirrel events for Windows
- `browser-fs-access`: File system access API for browsers
- `downloadjs`: Client-side file downloading utility

### Development Dependencies

- `webpack`: Module bundler
- `electron`: Desktop application framework
- `electron-forge`: Electron application packaging tool
- `@electron-forge/maker-squirrel`: Windows installer builder
- `@electron-forge/maker-wix`: Windows MSI builder
- `@electron-forge/maker-zip`: ZIP archive builder
- `@electron-forge/maker-deb`: Debian package builder
- `@electron-forge/maker-rpm`: RPM package builder
- `css-loader`, `style-loader`: CSS processing for webpack
- `html-loader`, `html-webpack-plugin`: HTML processing for webpack
- `webpack-dev-server`: Development server with hot reloading

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## � Learning Journey

This project represents a significant milestone in my web development journey through The Odin Project curriculum. Before reaching the React section, I wanted to prove to myself that I could build a sophisticated application using just the fundamental technologies I had learned so far.

Key learnings from this approach:

- **DOM Manipulation Mastery**: Developed deep understanding of working directly with the DOM
- **Module Pattern Proficiency**: Learned to organize code into maintainable modules without framework assistance
- **State Management Challenges**: Implemented custom state management, appreciating what frameworks provide
- **CSS Architecture**: Created a scalable styling system from scratch

This foundation will prove invaluable when I eventually learn React and other frameworks, as I'll understand what's happening "under the hood" and make better architectural decisions.

## �🙏 Acknowledgements

- **The Odin Project**: This project began as a simple Todo app assignment in The Odin Project curriculum and evolved far beyond the original scope
- **Figma**: Used for designing the modern UI/UX before implementation
- **Open Source Community**: For creating the amazing tools and libraries that made this project possible

---

## License

This project is licensed under the ISC License - see the LICENSE file for details.

---

© 2025 Pritam Debnath. All rights reserved.
