# code-craft-cli

A high-performance CLI tool that generates runnable code files from natural language prompts using Google's Gemini 2.0 Flash AI.

## Installation

Install the package globally via NPM so you can use the `gen` command anywhere:

```bash
npm install -g code-craft-cli
```

## Setup

You need a Google Generative AI API key to use this tool. Set it up in a .env file in your project root or add it to your environment variables:

```
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```

## Usage

Run the tool by describing the code you want to generate. By default, it saves to output.ts.

```text
gen "Create a function to calculate the area of a circle"
```

## Specify Filename and Extension

The tool is context-aware. If you use a .ts extension, it will automatically provide explicit TypeScript types and interfaces. For .js, it will provide clean JavaScript.

```text
# Generate a JavaScript file
gen "fetch bitcoin price from a public API" --name crypto.js

# Generate a TypeScript file
gen "binary search algorithm" --name search.ts
```

## Features

- **Smart Type Detection**: Automatically applies TypeScript types if the output file is .ts, ensuring your code is ready for professional environments.
- **Clean Output**: Automatically strips AI markdown backticks (```) so the generated file contains only valid code.
- **Immediate Execution**: Includes example variables and console.log statements so you can run node filename.js and see the results instantly.
- **Modern Tech Stack**: Built with Node.js, Vercel AI SDK, and Gemini 2.0 Flash.

## Requirements

- **Node.js**: 18.0.0 or higher
- **API Key**: A valid Google Gemini API key from Google AI Studio

## Author

Syed Affan Ali

GitHub: [MrAfoo](https://github.com/MrAfoo/code-craft-cli)

Portfolio: [Click Here](https://mrafoo-portfolio.vercel.app)

## License

MIT