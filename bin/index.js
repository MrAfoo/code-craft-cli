#!/usr/bin/env node
import { Command } from 'commander';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import fs from 'fs';
import ora from 'ora';
import chalk from 'chalk'; 
import 'dotenv/config';

const program = new Command();

const packageJson = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url)));

program
  .name('gen')
  .description('Code Craft CLI: AI-powered code generation')
  .version(packageJson.version) // Fixes the --version error
  .argument('<prompt>', 'What do you want to build?')
  .option('-n, --name <name>', 'Filename', 'output.ts')
  .action(async (prompt, options) => {
    const spinner = ora(chalk.cyan('AI is generating your code...')).start();
    
    try {
      const { text } = await generateText({
        model: google('gemini-2.5-flash'), 
        prompt: `
        Task: ${prompt}
        File Name: ${options.name}

        CRITICAL INSTRUCTIONS:
        1. If the file ends in .ts, you MUST use TypeScript syntax with explicit types.
        2. If the file ends in .js, you MUST use pure JavaScript. DO NOT use type annotations, interfaces, or any TS-specific syntax.
        3. Include example data and a console.log to make it runnable.
        4. Output ONLY the code. No markdown backticks or explanation.
        `,
      });

      // Regex to ensure no backticks end up in your file
      const cleanCode = text.replace(/```[a-z]*\n/g, '').replace(/```/g, '');

      fs.writeFileSync(options.name, cleanCode);
      spinner.succeed(chalk.green(`File ${options.name} created successfully!`));
    } catch (error) {
      spinner.fail(chalk.red('Error generating code.'));
      console.error(error);
    }
  });

program.parse();