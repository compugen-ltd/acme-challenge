# Notes

- The API doesn't support pagination with filtering applied, so traditional pagination wasn't an option. Instead, I implemented a "load more" approach.
- I adjusted the start script due to deprecated dependencies.
- While useReducer is typically better for scalability in production apps, I chose useState for readability here.
- For testing, I opted for unit tests using the React Testing Library since it is the one I'm most familliar with. I made sure to test scenarios where user instances didn't load properly by simulating a mock context.
