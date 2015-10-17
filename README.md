Volunteer Management System designed for Bristol Museums, Galleries & Archives
==============================================================================
This project is a web application for administrating large groups of people within an organisation. It was created and tailored for the staff at <strong>Bristol Museums, Galleries and Archives</strong>.

The wep-application is comprised of the classic LAMP stack. The system is hosted on a server running a Linux distribution, the HTTP requests are handled and served by Apache, the database management is handled by MySQL, and the website is almost entirely in PHP-generated HTML.

Short Description
-----------------

The project started as a database with a friendly user interface that was going to be used by the staff at Bristol Buseum but it evolved into something much bigger than that.

Most of the code written by us can be found in:
- /application/controllers/
- /application/views/
- /scripts/
- /styles/

Some of the extra features (all available through a user interface):
- Registration form editable through a user interface (similar to Survey Monkey) with automatic generation of conditions for input validation;
- Basic blogging platform to keep the volunteers up to date with the coming up events where their help is needed;
- Advanced search for volunteers with specific skills;
- Extensive permission system for admins;
- Automatic statistics generation with visual charts;
- Database backup management;

Contributors
------------
This project was done as part of our Computer Science degree at Bristol Uni. 

The team that developed the project was formed of:
- Ana Dumitras
- Andrei Ilisei
- Kristian Krustv
- Milan Zolota
- Nikolay Nikolov
- Patrick Johnston

Since most of us had no experience with web development we decided to develop everything from scratch and trying to avoid external libraries as mush as possible to maximise the knowledge gain.

Features
--------

The system consists of two perspectives: the main one is to serve the needs of staff from Bristol Museum for database administration, another one is designed for volunteers. Each provides a different interface and functionality.

####The **Admin perspective** enables the volunteer management team to:

0. View information about volunteers
0. Advanced search options to find volunteers with specific characteristics/skills/info
... ![alt text](https://cloud.githubusercontent.com/assets/9435724/10558950/c1b83dfc-74db-11e5-96bf-7f7ead4c4bf7.png)
0. Send e-mails to volunteers and groups of volunteers
0. Register and delete users
0. Create and delete sub admins
0. Manage sub admin permissions
... ![alt text](https://cloud.githubusercontent.com/assets/9435724/10558948/c18fb2ba-74db-11e5-99cf-7c61fbe99c95.png)
0. Edit volunteers’ profile
0. Edit the registration form
... ![alt text](https://cloud.githubusercontent.com/assets/9435724/10558952/c1b9606a-74db-11e5-9866-70b9e98b9e79.png)
0. Create groups and allocate volunteers to them
0. Generate statistics on fields from the database
... ![alt text](https://cloud.githubusercontent.com/assets/9435724/10558949/c1b5340e-74db-11e5-87fa-f0426c0d189f.png)
0. Create and edit events, and allocate groups to them 
0. Keep track of a changelog functionality
0. Create, delete and restore backups of the database
0. Access and edit a contact page
0. Access and edit the terms and conditions
0. View the changelog
... ![alt text]https://cloud.githubusercontent.com/assets/9435724/10558951/c1b834d8-74db-11e5-8c6f-0de51b8d4dd3.png

####The **Volunteer perspective** lets volunteers:

0. Register in the database
0. Edit their profile
0. View information about events
0. Access a contact page
0. Access a terms and conditions page
