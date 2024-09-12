# Mini message board

## About

This project is a basic Express app that uses EJS as the template engine. This also follows the MVC architecture for organizing models, views, and controllers for separation of concerns.

## Lessons learned

- Partials are great but it requires you to keep in mind that all the file paths are relative to the router. I had an issue where the `messagesController` was unable to access the styles sheet until I created a new `assetsPath` pointing to the relative path from `messagesController`