# Intro

You are asked to build a very simple data viz application.

The metric observed is the volume of searches in Google for a given list of keywords, structured in a category tree.

# Level 1 - Fetch and display data

We want to display the evolution of the search volume of the previous 48 months for the top-level category in a nice graph. We would be able to change the selected period to navigate into the data.

The API `GET /api/volumes/250162.json` returns the sum of the search volume per month for all the keywords monitored.

Then go to [next level](../level2)
