**Javascript Weather Program**

- This was a follow along with Youtuber "BroCode" as the last program demonstration from his 12 hour Javascript tutorial.


**Changes I made to original code:**

- PROBLEM: 
         The API that the weather data came from was updated and the code in the video would no longer function.
         The issue came from the API requests being changed from just needing to input a city to receive weather data about that city to
         needing to use the longitude and latitude of the city as input to access the weather data. This meant that I could no longer access the 
         weather data with one request using the city as input.

- SOLUTION: 
         I did one API request using the city as input to retrieve the longitude and latitude first. Then, using those two coordinate values,
         I made another API request to retrieve the weather data I needed.
     
