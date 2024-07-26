# Portfolio Project

This project utilizes the GitHub API to load public projects from your GitHub account. It also supports adding custom projects through a custom JSON file.

## Tech Stack

- [React](https://reactjs.org/) (initialized using [Create React App](https://create-react-app.dev/)): To initialise the portfolio.
- [Tailwind CSS](https://tailwindcss.com/) is used for styling purpose.
- [Headless UI React](https://headlessui.dev/react) for making use of components like Dropdown and ListBox
- [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) A plugin used by react-markdown to highlight code syntax
- [rehype-raw](https://github.com/rehypejs/rehype-raw) plugin to parse the tree (and raw nodes)
- [rehype-sanitize](https://github.com/rehypejs/rehype-sanitize) plugin to sanitize HTML.
- [remark-gfm](https://github.com/remarkjs/remark-gfm) plugin to support [GFM](https://github.github.com/gfm/) (autolink literals, footnotes, strikethrough, tables, tasklists).
- [react-markdown](https://github.com/remarkjs/react-markdown) React component to render markdown.

## Installation

### Prerequisites

- Node.js version 20.9.0 or higher is recommended.

### Clone the Repository

```bash
git clone https://github.com/himanshu077/my-portfolio.git
cd my-portfolio
```

### Install Dependencies

```bash
npm install
```

### Set Up Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```
REACT_APP_GITHUB_USERNAME=your_github_username
REACT_APP_GITHUB_API_KEY=your_github_api_key
```

### Run the Project

```bash
npm start
```

The project will be available at `http://localhost:3000`.

## Live URL

Check out the live version of the project at: [Live URL](https://portfolio-ten-gamma-30.vercel.app/)

## Contributing

Feel free to open issues or submit pull requests. Contributions are always welcome!

## License

This project is licensed under the MIT License.

This `README.md` should provide a comprehensive guide for anyone looking to understand, install, and run your portfolio project.