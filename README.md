# Codium

Codium is online website where you can share off your coding skill by posting a story to the main feed. User can comprise their story of a title, subtitle and body filled with whatever your heart desires! Users are able to click on individual stoires where they can leave comments under that user post. You can also like said users story too! Our goal of Codium is allow people a space to share their coding experience with other, learn from other, seek help with other, the potentials are limitless!

#Link to Codium website live on Heroku
https://codium-app.herokuapp.com/

# Dynamic features
  * Comments
    *  As a logged-in user, you are able to post, edit, and delete owned comments. Utilizing DOM manipulation, the website is able to update the the page without the need of       refreshing or being routed/redirected.
  * Likes
    * As a logged-in user, you are able to like a story. However each user is only able to like a particular story once, re-clicking the like will remove the like for that story. This is done dynamically via DOM manipulation meaning this page does also not need to be refeshed, rendered, or redirected.
 
# Breakthroughs
  * Creating, Edit, Delete comments
    *  Implementing these features proved to be no easy task. In order to have these features working dynamically we had to manipulate the DOM so event listeners were responsible for changing effects. A particular part that was quite challenging, was creating the comments (dynamically) to have the same html structure along with the corresponding classes as the pug file. That way when the CSS style sheet loaded it would effect both prewritten elements of the pug file and those that had been made via DOM manipulation.

# Technology
Our group uses a variety tech throughout this prject. For the backend we used Postgrest and Sequelize to create our database system. We express to build our frontend routes. We use the middleware csurf to secure our routes, along with validators to ensure that we only receive what we intend to fromt the users inputs. For the frontend, we used Pug to create out html files, this helped remove the amount of boiler plate code that would have had to been written. In order to style those Pug files we used CSS, adding stylesheets to each Pug file make changes to elements to make a more appealing site. All of these technologies allowed us to have complete control over the looks and functionality of our application!
