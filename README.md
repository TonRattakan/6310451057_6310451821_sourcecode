<p align="center">
  <a href="https://nodejs.org/" target="blank"><img src="https://nodejs.org/static/images/logo.svg" width="200" alt="Node.js Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nodejs/node/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nodejs/node

<p align="center">A powerful <a href="https://nodejs.org" target="_blank">JavaScript runtime</a> built on Chrome's V8 JavaScript engine, designed for building efficient and scalable network applications.</p>
<p align="center">
<a href="https://www.npmjs.com/package/node" target="_blank"><img src="https://img.shields.io/npm/v/node.svg" alt="NPM Version" /></a>
<a href="https://github.com/nodejs/node/blob/main/LICENSE" target="_blank"><img src="https://img.shields.io/npm/l/node.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/package/node" target="_blank"><img src="https://img.shields.io/npm/dm/node.svg" alt="NPM Downloads" /></a>
<a href="https://discord.gg/nodejs" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord" /></a>
<a href="https://paypal.me/nodejs" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
<a href="https://twitter.com/nodejs" target="_blank"><img src="https://img.shields.io/twitter/follow/nodejs.svg?style=social&label=Follow"></a>
</p>

## Description
This project is built using Node.js, Express.js, EJS, JavaScript, and CSS.

## Prerequisites
Before cloning the repository, ensure you have the following installed on your system:

### Core Tools:
- [Node.js](https://nodejs.org/en) (Includes npm)

### Optional Development Tools:
You can use any text editor or IDE, but we recommend the following for an enhanced development experience:
- **[Visual Studio Code (VS Code)](https://code.visualstudio.com/Download)**: A powerful and lightweight editor with excellent extensions for JavaScript and Node.js development.
- **[Neovim](https://neovim.io/)**: An advanced, lightweight text editor for terminal users.

### Local Server Tool:
For managing your database and local web server more efficiently, consider installing:
- **[MAMP](https://www.mamp.info/en/downloads/)**: Provides a local server environment for macOS and Windows.

## How to Clone and Set Up the Project

1. **Clone the repository**  
   Open your terminal or command prompt and run:
   ```bash
   git clone https://github.com/TonRattakan/6310451057_6310451821_sourcecode.git

2. **Navigate into the project folder**
    ```bash
    cd 6310451057_6310451821_sourcecode
    ```
3. **Install Dependencies**
    Install the required Node.js dependencies by running:
    ```bash
    npm install
    ```

4. **Set Up MySQL using MAMP**
    - Open MAMP and start the servers (Apache and MySQL).
    - Access phpMyAdmin by clicking the Open WebStart page in MAMP, then navigate to `http://localhost/phpMyAdmin`.
    - In phpMyAdmin, create a new database:
        1. Click on the Databases tab.
        2. Enter a name for the database (e.g., `online_store`) and click Create.
    - Import the `online_store.sql` file into the new database:
        1. Click on the database you just created from the list.
        2. Go to the Import tab.
        3. Choose the `online_store.sql` file from your project folder and click Go.

5. **Run the Project**
    Start the project by running:
    ```bash
    npm run start
    ```
    The application will be accessible at `http://localhost:8000` (or the specified port in your configuration).

## Technologies Used
- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web application framework for Node.js
- **EJS**: Templating engine
- **JavaScript**: Frontend scripting
- **CSS**: Styling
- **MAMP**: Local server environment for managing MySQL database