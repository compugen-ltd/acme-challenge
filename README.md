# Notes

- The API doesn't support pagination with filtering applied, so traditional pagination wasn't an option. Instead, I used a "load more" approach.
- I adjusted the start script due to deprecated dependencies.
- While useReducer is typically better for scalability in production apps, I chose useState for readability here.
