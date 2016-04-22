# Health Tracker
A health tracker app for the Udacity Front End Developer Nanodegree. Using the
Nutritionix API, this app allows the user to track the number of calories they
have eaten on a daily basis. The user may also see a timeline of their
activity.

## Installation
Fork or download the repo [here at GitHub](https://github.com/b-ritter/health-tracker).

Open index.html in a browser and search for the foods you have eaten today.

### Your Health Tracker Account
If you have not logged-in already, Health Tracker will ask you to choose a user
name. You will be authenticated by means of Firebase's anonymous authorization.
You data will be kept for 6 months until which it will be permanently deleted.

## Technology

### Front-end Library
The Health Tracker App uses Backbone.js to structure the interaction between
user and the server.

### Firebase
User data is persisted on a Firebase NoSQL server. The structure of the database
is as follows:

<pre>Users
|
|---UserID 1
|   |-----User name
|
|---UserID 2
|   |-----User name
|      
Timelines
|
|---UserID 1
|   |----Day 1 (Full Date)
|   |----Day 2
|
|---UserID 2
|   |----Day 1 (Full Date)
|   |----Day 2
|
Lists
|
|---UserID 1
|   |----Day 1 (Full Date)
|   |   |----Food Item
|   |   |----Food Item
|   |   |----Food Item
|   |----Day 2
|
|---UserID 2
|   |----Day 1 (Full Date)
|   |    |----Food Item
|   |    |----Food Item
|   |    |----Food Item
|   |----Day 2
|
Calorie Totals
|
|---UserID 1
|   |----Day 1 (Full Date)
|   |   |----Calorie total
|   |----Day 2
|   |   |----Calorie total
|
|---UserID 2
|   |----Day 1 (Full Date)
|   |   |----Calorie total
|   |----Day 2
|   |   |----Calorie total
</pre>

Thus for each user, a list of food items ordered by day is stored.
