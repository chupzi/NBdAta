# CS 4460 - Team NBdAta Repository

This project was created by Nikhil Deo, Matthew Levine, Alan Lu, Almaze Lema. We are all students at Georgia Tech.

The goal of this project is to show how the amount of three pointers taken in the NBA has drasticaly increased over time. The pixel graph displays NBA league per game data. The statistics were scaled by a factor of 600 in order to show the ratios of such statisitcs. The goal is for people to see how this ratio, the amount of shots in the NBA that are threes, has increased,. The year can be changed either by using the drop down menu, or the slider. The statistics on the left side will change accordingly. 

# Files in this Repo:
- This project was built with D3.js and the d3 work can be found in the grid.js file.
- The NBData.csv contains the data we used to create the project.
- style.css contains the CSS used to help with the design of the interface
- index.html houses the HTML for the site

To use the visualization tool, visit our github pages hosted site: https://chupzi.github.io/NBdAta/

# Instructions for Running the Program:
1) Open the folder in your terminal and run this command: python -m SimpleHTTPServer 8080
2) Go to localhost:8080 to run the project locally

# Structure of the Code:
There is more indepth comments within the files but at a high level, the basic skeleton of the interface can be found in the index.html file with the functionality housed in the grid.js file. Within grid.js, there are a few important functions to take note of:
- updateChart() - this function serves to gather the data for the year that is to be displayed, conduct the necessary calculations such that the needed metrics can be added to the grid, and finally update the statistcs seen on the right side of the graph.
- updateGraph() - this function is the one that actually draws the graph using D3. There is code outside of this function that do things like create the SVG on which the graph will be drawn, determing the chart's dimensions using a defined set of padding values, and creating the grid object that will house the graph. Within the function, the graph is created and the same function is repurposed with each new season that is selected such that the visualization can update the coloring of the circles according to the new data.
- gridData() - this function creates the data on which the graph is made.

There are more functions and code within the files but these three files handle a lot of the core functionality and anything not mentioned here should commented in-depth within the file.
