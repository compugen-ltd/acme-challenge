import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import UserList from "./UserList";
import { ListUsersContext } from "../../context/listUsersContext";

const mockContextValueWithUsers = {
  usersData: [
    {
      name: { first: "John", last: "Doe" },
      gender: "male",
      dob: { date: "1962-10-23T11:18:17.082Z" },
      login: { uuid: "1" },
      email: "john@example.com",
      picture: { large: "image.jpg" },
    },
    {
      name: { first: "Jane", last: "Doe" },
      gender: "female",
      dob: { date: "1975-05-15T08:35:12.435Z" },
      login: { uuid: "2" },
      email: "jane@example.com",
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

const mockContextValueEmpty = {
  usersData: [],
  setPage: jest.fn(),
  status: "ready",
  searchQuery: "",
};

const mockContextValueError = {
  usersData: [],
  setPage: jest.fn(),
  status: "error",
  searchQuery: "",
};

test("renders UserList correctly with users", () => {
  render(
    <Router>
      <ListUsersContext.Provider value={mockContextValueWithUsers}>
        <UserList />
      </ListUsersContext.Provider>
    </Router>
  );

  expect(screen.getByText("John Doe")).toBeInTheDocument();
  expect(screen.getByText("Male")).toBeInTheDocument();
  expect(screen.getByText("23/10/1962")).toBeInTheDocument();
});

test("renders UserList with 'No users found' message", () => {
  render(
    <Router>
      <ListUsersContext.Provider value={mockContextValueEmpty}>
        <UserList />
      </ListUsersContext.Provider>
    </Router>
  );

  expect(screen.getByText("No users found")).toBeInTheDocument();
});

test("renders UserList with 'An unexpected error occurred' message", () => {
  render(
    <Router>
      <ListUsersContext.Provider value={mockContextValueError}>
        <UserList />
      </ListUsersContext.Provider>
    </Router>
  );

  expect(
    screen.getByText("An unexpected error occurred, please try again later.")
  ).toBeInTheDocument();
});

test("calls loadMore function when 'Load more' button is clicked", () => {
  render(
    <Router>
      <ListUsersContext.Provider value={mockContextValueWithUsers}>
        <UserList />
      </ListUsersContext.Provider>
    </Router>
  );

  fireEvent.click(screen.getByText("Load more"));

  expect(mockContextValueWithUsers.setPage).toHaveBeenCalledTimes(1);
});

test("disables 'Load more' button when status is 'loading'", () => {
  render(
    <Router>
      <ListUsersContext.Provider
        value={{ ...mockContextValueWithUsers, status: "loading" }}
      >
        <UserList />
      </ListUsersContext.Provider>
    </Router>
  );

  expect(screen.getByText("Load more")).toBeDisabled();
});
