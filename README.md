# OddJob

###GA WDI London - Project 4

#### Introducing OddJob

This website is a job site but specifically for odd jobs, hence the name. Users can post jobs on the site such as cleaning out their garage, de-weeding their garden etc. and then other users are able to apply for these jobs. The user who originally posted the job can then view their applicant pool and select which user they wish to assign the job to. Once the job has been assigned to one of the specific applicants, the job poster can make a payment through the site for the work to be carried out. When a user posts a job, they are emailed with a confirmation to let them know their job has been successfully posted.

#####[View it here!](https://warm-reef-46815.herokuapp.com/)


![](/src/images/websitelandingpage.png)


#####The Build

I built this project using Ruby on Rails, JavaScript, AngularJS, HTML, SASS, postrgreSQL database, Stripe, AWS and Bootstrap. I integrated the Stripe payment system which allows users to make a payment once they have selected which user from their pool of applicants is going to complete the job. I also used the Rails mailer which was hooked up to send the user an email once they had successfully posted their job.


![](/src/images/jobsIndexPage.png)

####Approach / How it works

The website is very simple to use and that was one of the main things I wanted to make sure when building it. I wanted the site to be able to be used by a variety of different people and therefore making a very clear and easy user experience was fundamental. On the index page for the current jobs listed, you filter through the jobs based on a search query, the pay of the job (high to low and vice versa) and also filtering through which categories you would be interested in such as cleaning, home maintenance, high pay etc.

When the user posts their job, they are asked to give a description of the work involved, the hourly rate, the date they wish to have the work done and then to select which categories they feel the job falls into. On the index page of the jobs, the main image is displayed as well as having an icon representing one of the categories that the job falls into on top of the image.



#### Problems & Challenges

The main issue I had with this project was actually to do with google maps. I wanted to integrate the google maps API to give a clearer view of where the jobs that were advertised where actually going to take place. Unfortunately I was having issues with my API key expiring and then not registering so in the end I decided to put this on the future updates list as it wasn't vital to the project, but with the deadline approaching I decided to focus on other parts of the site that I felt were more essential. I also plan to make the project much more responsive as currently it is only really suited for laptop screens and obviously to make it widely available, it needs to be responsive for phones. This is something I will sort out over the next couple of weeks though.

I will definitely return to this project in the future to add more functionality, such as allowing users to add jobs to an array of the jobs that they wish to save for later rather than applying instantly. I would also like to set up a system whereby if a user has a particular skill or profession such as a plumber or electrician, then they would be able to provide proof of this and then be given access to other jobs that require these skills. I believe this would make the site a lot more alluring as it would mean that not only would their be unskilled jobs which anyone can apply for, but also a way for tradesman to get more private jobs if things are quieter for them.
