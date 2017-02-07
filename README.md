# Ionic 2 TODO App

This is a small todo app to demonstrate how to separate application logic and business rules from Ionic 2 as a framework. Almost all the logic is in a directory called core with no outside dependencies.

Ionic 2 interacts with the core app through a single point of entry, the ItemController.

For a todo app, this example might be a bit over-engineered, but it serves as a starting point for a more complex app I’m developing.

[Please read my accompanying blog post about this project here](http://www.ntaso.com/simple-ionic-2-todo-app/).

And my other post [Towards A Clean Architecture for Ionic 2 Apps](http://www.ntaso.com/towards-a-clean-architecture-for-ionic-2-apps/) to understand what I’m trying to achieve.

The app is extremely light on UI stuff. There’s basically a Timer that triggers a dummy interaction after 3 and 5 seconds. But that’s not the point of the project ;)