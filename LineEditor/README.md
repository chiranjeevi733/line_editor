# Simple Line Editor in C

## Team Members

1. Chethan C
2. Chinmay S K
3. Chiranjeevi G M
4. Chiranjeevi H L

## Project Description

This project implements a simple command-line line editor in C.

The editor allows users to create, view and modify a small text
document using commands entered through the terminal.

The document is stored in memory using an array of character pointers.

## Data Structure

The editor uses an array of character pointers:

    char *lines[MAX_LINES];

Each pointer stores the address of a dynamically allocated string
containing one line of the document.

The maximum number of lines supported is 100.

## Features Implemented

### Core Features

1. Insert a line
2. Delete a line
3. Display the document

### Additional Features

4. Save document to a text file
5. Load document from a text file
6. Help command
7. Exit command

## Commands

    insert <line number> <text>
    delete <line number>
    display
    save <filename>
    load <filename>
    help
    exit

## Example

    > insert 1 Hello
    Line inserted successfully.

    > insert 2 Welcome to our editor
    Line inserted successfully.

    > display

    ---------- DOCUMENT ----------
    1: Hello
    2: Welcome to our editor
    ------------------------------

## How to Compile

Open the Terminal and move into the project folder:

    cd ~/LineEditor

Compile the program using gcc:

    gcc line_editor.c -o line_editor

## How to Run

Run the program using:

    ./line_editor

## Files

- line_editor.c - Main C source code
- HELP.md - Command documentation
- README.md - Project documentation
- notes.txt - Example saved document

## Testing

The following features were tested successfully:

- Insert line
- Delete line
- Display document
- Save document
- Load document
- Help command
- Exit command

## Conclusion

The project demonstrates the implementation of a simple
command-line text editor using C, arrays, pointers, dynamic
memory allocation and file handling.