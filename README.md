# Polymath - Task Management Application

A comprehensive and intuitive task management application built with modern web technologies and packaged as a desktop application using Electron.

![Polymath App](https://via.placeholder.com/800x450?text=Polymath+App)

## 📚 Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Core Modules](#core-modules)
- [UI Components](#ui-components)
- [Electron Integration](#electron-integration)
- [Getting Started](#getting-started)
- [Build and Deployment](#build-and-deployment)
- [Dependencies](#dependencies)
- [Contributing](#contributing)

## 🚀 Introduction

Polymath is a task management application designed to help users organize their work efficiently. It provides features for creating projects, adding tasks with different priorities, setting due dates, and tracking completion status. The application uses a modern architecture with a clean separation of concerns between data management and UI components.

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

### Data Flow

1. **User Interaction**: User interacts with UI components
2. **Event Handling**: UI components call core modules to perform operations
3. **Data Processing**: Core modules process the data and update storage
4. **UI Update**: Core modules return data to UI components which update the view

## 📁 Project Structure

```
polymath/
├── src/                     # Source files
│   ├── index.js             # Main entry point
│   ├── styles.css           # Global stylesheets
│   ├── template.html        # HTML template
│   ├── fonts/               # Custom font files
│   ├── icons/               # Icon assets
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
├── webpack.common.js        # Shared webpack configuration
├── webpack.dev.js           # Development webpack configuration
├── webpack.prod.js          # Production webpack configuration
├── package.json             # Project dependencies and scripts
└── README.md                # Project documentation
```

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

### Dialog Boxes

- **Add Task Dialog** (`add_task_dialog.js`): Form for creating new tasks
- **Edit Task Dialog** (`edit_task_dialog.js`): Form for editing existing tasks
- **Preview Task Dialog** (`preview_task_dialog.js`): Detailed view of a task

### Custom UI Elements

- **Custom Popups** (`custom_popups.js`): Async confirmation dialogs
- **Scrollbar** (`scrollbar.js`): Smooth custom scrollbar implementation

## 🖥️ Electron Integration

Polymath can be run as a desktop application using Electron. Key features:

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

---

## License

This project is licensed under the ISC License - see the LICENSE file for details.

---

© 2025 Pritam Debnath. All rights reserved.
