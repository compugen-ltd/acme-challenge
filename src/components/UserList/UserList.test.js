import { render, screen } from "@testing-library/react";
import UserList from "./UserList";
import { ListUsersContext } from "../../context/listUsersContext";

// Mock the context value
const mockContextValue = {
  usersData: [
    {
      name: { first: "John", last: "Doe" },
      gender: "male",
      dob: { date: "1990-01-01" },
      login: { uuid: "1" },
      email: "john@example.com",
      picture: { large: "image.jpg" },
    },
  ],
  setPage: jest.fn(),
  page: 0,
  status: "ready",
  searchQuery: "",
  setGenderFilter: jest.fn(),
  setNationalityFilter: jest.fn(),
};

test("renders user list correctly", () => {
  render(
    <ListUsersContext.Provider value={mockContextValue}>
      <UserList />
    </ListUsersContext.Provider>
  );

  // Verify that user data is rendered
  expect(screen.getByText("John Doe")).toBeInTheDocument();
  expect(screen.getByText("Male")).toBeInTheDocument();
  expect(screen.getByText("1990-01-01")).toBeInTheDocument();
});
