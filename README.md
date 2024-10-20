## Atomize Pro. 

Atomize Productivity (also known as 'Atomize Pro') is a productivity app designed to elevate the way you track goals and manage progress across all areas of life. Whether you're focusing on short-term tasks or long-term objectives, Atomize Pro helps you monitor and measure progress through diverse methods -- not just traditional checkboxes -- making your journey toward success more dynamic and engaging.
 
The front-end is built with vanilla Javascript, CSS, and React, but with improvements, will include features supported by libraries such as Dnd Kit. On the back-end, Express keeps the server afloat and a PostGresql database holds all the user's stored data and preferences.


## Current Features

### Measure progress in four different ways:
Choose from four different templates to track your goal and your day's progress: 

1) A check-list for simplicity and black-and-white outcomes
2) A progress bar for meeting a specific number of units
3) Sets for tracking repetitions of activities
4) A three-level block for measuring progress in stages
  
### Set List Categories with Tabs:
Keep your goals organized in lists and stored under customized tabs for easy navigation and overwhelm prevention.

### An Aesthetically Pleasing Interface:
Interact with an interface that is pleasant to navigate and look at. Life is not an office and so it shouldn't feel like one when you're planning your next steps.


## Installation

### 1. Clone this repo.
Clone this repo by copying this into your terminal.

```git clone https://github.com/SaraSuriya/atomize-pro.git```

```cd atomize-pro```

### 2. Install dependencies in the client folder.
Enter the client folder and install dependencies.

```cd client```

```npm i```

### 3. Install dependencies in the server.
Exit the client folder and enter the server folder, then install dependencies.

```..```

```cd server```

```npm i```

### 4. Create an .env file.
Create an .env file in the server folder. Paste the following and enter the relevant information.

```PSQL_DATABASE=database-name-here```

```PSQL_USER=name-here```

```PASSWORD=password-here```

```PORT=3000```

### 5. Connect to the database.
Connect to the PostGreSQL database.

### 6. Run the server.
In the server folder, enter the following into the terminal.

```npm run dev```

### 7. Run the client.
Exit the server folder and return to the client folder. Run the client by entering the following into the terminal.

```npm run dev```

## Tech Stack

- React
- PostGreSQL
- Express.js
