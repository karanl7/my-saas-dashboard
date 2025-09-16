# SaaS Contracts Management Dashboard

A single-page application built with React and Tailwind CSS that simulates a SaaS contracts management dashboard. This project was built as part of a UI/UX Developer assignment.

**Live Demo Link:** [your-vercel-url-goes-here]

---

![SaaS Dashboard Screenshot](<public/screenshot.png>)
*(**Note:** To add a screenshot, take a picture of your running application, name it `screenshot.png`, and place it inside your `/public` folder.)*

## Features

-   [cite_start]**Mock Authentication:** A clean login page with mock authentication logic (`password: test123`). [cite: 4]
-   [cite_start]**Contracts Dashboard:** A responsive, table-based view of all contracts fetched from a mock API. [cite: 5]
-   [cite_start]**Dynamic Search & Filtering:** Filter contracts by Status or Risk level, and perform a real-time search by Contract Name or Parties. [cite: 6, 7]
-   [cite_start]**Pagination:** The contract list is paginated with 10 rows per page. [cite: 7]
-   [cite_start]**Detailed View:** Click on any contract to navigate to a detailed page showing specific metadata, key clauses, and AI-driven insights. [cite: 8, 9]
-   [cite_start]**Simulated File Upload:** A drag-and-drop modal to simulate the file upload process with status updates. [cite: 11, 12]
-   [cite_start]**State Management:** Gracefully handles all UI states, including loading, error, and empty states. [cite: 8]

## Tech Stack

-   [cite_start]**Framework:** React (Vite) [cite: 3]
-   [cite_start]**Styling:** Tailwind CSS [cite: 3]
-   [cite_start]**State Management:** React Context API & Hooks [cite: 3]
-   **Routing:** React Router DOM
-   **Data Fetching:** Axios
-   [cite_start]**Deployment:** Vercel [cite: 3]

## Local Setup

To run this project locally, follow these steps:

1.  Clone the repository:
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    ```
2.  Navigate to the project directory:
    ```bash
    cd your-repo-name
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```
The application will be available at `http://localhost:5173`.

## Decisions & Assumptions

-   [cite_start]**State Management:** I chose the **Context API** for managing global authentication state because it is built into React and is perfectly suited for the application's scale, avoiding the boilerplate of a larger library like Redux. [cite: 3]
-   [cite_start]**Mock API:** For simplicity and to meet the assignment requirements, the contract list and detail data were combined into a single `contracts.json` file hosted statically in the `/public` folder. [cite: 12] The detail page fetches this list and finds the correct contract by its ID.
-   **Hooks:** Custom hooks were created (`useFetch`, `useAuth`) to encapsulate and reuse logic, leading to cleaner and more modular components.