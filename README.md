# academy-node-workshop

Node.js Workshop

## Branch description

In this branch we will introduce the basic usage of Node.js

We will run a JavaScript file from the console and use the **REPL** to execute JavaScript code. 

__Read-Evaluate-Print-Loop__

Node.js comes bundled with a REPL environment. It performs the following tasks:

 - **Read** − Reads user's input, parses the input into JavaScript data-structure, and stores in memory.

 - **Eval** − Takes and evaluates the data structure.

 - **Print** − Prints the result.

 - **Loop** − Loops the above command until the user presses ctrl-c twice.

## Branch Tasks

1. Execute the contents of the init.js file.
2. In the terminal type ```node``` to start using the REPL. Follow the instructions to open the editor.
3. In the editor mode write the code below.

```
> .editor
// Entering editor mode (^D to finish, ^C to cancel)

function welcome(name) {
  return `Hello ${name}!`;
}

welcome('Node.js User');

// ^D
'Hello Node.js User!'
>
```

## Covers

- Node basic usage
- JavaScript code execution
- REPL (Read-Evaluate-Print-Loop)
