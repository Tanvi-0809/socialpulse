SocialPulse

SocialPulse is a social media analytics dashboard built using React. It brings together post analytics, audience insights, and content scheduling in one application.

I worked on this project as part of my Web Technology Workshop. The idea was to build a dashboard where users could view social media performance and manage their content without switching between different sections or tools.

Features

* Overview: Displays followers, engagement, reach, and other performance metrics.
* Analytics: Shows engagement trends, post performance, and top-performing posts.
* Audience: Visualizes audience demographics, locations, and activity patterns.
* Posts: Allows users to create posts and filter them by platform or status.
* Calendar: Displays scheduled posts and updates when new posts are added.
* Settings: Provides basic application preferences.
* API Feed: Fetches sample post data using Axios.

Tech Stack

* React + Vite — Frontend development
* JavaScript — Application logic
* React Router — Navigation between pages
* Context API — Sharing post data between components
* Recharts — Data visualization
* Axios — API integration
* CSS — Styling and responsive layouts
* localStorage — Saving posts and preferences

How It Works

The application is divided into separate pages and reusable components.

React Router handles navigation, while Context API manages shared post data.

For example, when a user creates a scheduled post, it gets added to the shared state and appears in the Calendar. The post data is also saved in localStorage so it remains available after refreshing.

The Analytics section includes an API feed that fetches sample data from JSONPlaceholder.

Running the Project

Clone the repository:

git clone https://github.com/Tanvi-0809/socialpulse.git
cd socialpulse

Install dependencies:

npm install

Start the development server:

npm run dev

Project Structure

* src/pages/ — Main dashboard pages
* src/components/ — Reusable UI components and charts
* src/context/ — Shared post state
* src/data/ — Sample analytics and audience data
* src/services/ — API requests
* src/styles/ — Component styling

Note

This is a frontend project built using sample data. It does not connect to real social media accounts or automatically publish scheduled posts.

What I Learned

Through this project, I got more familiar with building a React application using multiple components, managing shared state with Context API, integrating APIs using Axios, and working with charts and responsive layouts.

I also learned how different parts of an application can be connected while keeping the code organized.