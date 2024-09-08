# User Management Application

## Table of Contents

1. [Description](#description)
2. [Demo](#demo)
3. [Features](#features)
4. [Technologies Used](#technologies-used)
5. [Dependencies](#dependencies)
6. [Setup](#setup)

## Description

This project is a User Management Application built with **React**, **Redux**, **TypeScript**, and **Tailwind CSS**. It fetches user data using **Axios** from an external API, displays it in a table with advanced filtering, sorting functionality, and supports exporting the data to **CSV** and **PDF** formats.

## Demo

You can view the live demo of the application here: [User Management Demo](https://user-management-table-dybas.netlify.app/)

## Features

- **User Table**: Displays user data (name, username, email, and phone).
- **Filtering**: Allows filtering users by name, username, email, or phone.
- **Sorting**: Supports sorting by any column in ascending or descending order.
- **Export to CSV**: Export the filtered and sorted data to a CSV file.
- **Export to PDF**: Export the filtered and sorted data to a PDF file.
- **Responsive Design**: Uses Tailwind CSS for a responsive and modern user interface.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Redux Toolkit**: For state management.
- **TypeScript**: For static type checking.
- **Tailwind CSS**: For rapid and modern styling.
- **Axios**: For making HTTP requests to fetch user data.
- **jsPDF**: For generating PDF files.
- **file-saver**: For saving files locally (CSV).

## Dependencies

- **Axios**: Used to fetch data from the API.
- **file-saver**: Used to save CSV files.
- **jsPDF & jspdf-autotable**: Used to generate and format tables in PDF.
- **Tailwind CSS**: For utility-first CSS design.
- **Redux Toolkit**: Simplifies Redux state management.

## Setup

To run the project locally, follow these steps:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/Oskii0201/User-management-table
    cd user-management
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Run the development server**:

    ```bash
    npm start
    ```

    The application will start at `http://localhost:3000`.
