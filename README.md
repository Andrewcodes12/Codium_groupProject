Codium is an online website where you can share your coding experience by posting a story to the main feed. User can compose their story of a title, subtitle, and body filled with whatever your heart desires! Users can click on individual stories where they can leave comments under a user's post. You can also like said user's story too! Our goal of Codium is to allow people a space to share their coding experience with others, learn from others, seek help with others, the potentials are limitless!

#Link to Codium website live on Heroku
https://codium-app.herokuapp.com/

# Dynamic features
  * Comments
    *  As a logged-in user, you can post, edit, and delete owned comments. Utilizing DOM manipulation, the website can update the page without the need of refreshing or being routed/redirected.
  * Likes
    * As a logged-in user, you can like a story. However, each user is only able to like a particular story once, re-clicking the like will remove the like for that story. This is done dynamically via DOM manipulation meaning this page does also not need to be refreshed, rendered, or redirected.
 
# Breakthroughs
  * Creating, Edit, Delete comments
    *  Implementing these features proved to be no easy task. To have these features working dynamically we had to manipulate the DOM so event listeners were responsible for changing effects. A particular part that was quite challenging, was creating the comments (dynamically) to have the same HTML structure along with the corresponding classes as the pug file. That way when the CSS style sheet loaded it would affect both prewritten elements of the pug file and those that had been made via DOM manipulation.

# Technology
Our group uses a variety of technologies throughout this project. For the backend, we used Postgres and Sequelize to create our database system. We use Express to build our frontend routes. We use the middleware csurf to secure our routes, along with validators to ensure that we only receive what we intend to from the user's inputs. For the frontend structure, we used Pug to create HTML files, this helped remove the amount of boilerplate code that would have had to been written. To style those Pug files we used CSS, adding stylesheets to each Pug file makes changes to elements more appealing. All of these technologies allowed us to have complete control over the looks and functionality of our application!

We hope you enjoy it!
