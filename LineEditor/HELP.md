# Simple Line Editor - Help

## Introduction

The Simple Line Editor is a command-line text editor written in C.
It allows the user to insert, delete, display, save and load lines of text.

## Commands

### 1. insert <line number> <text>

Inserts a new line at the specified line number.

Example:

    insert 1 Hello World

This inserts "Hello World" as line 1.

---

### 2. delete <line number>

Deletes the line at the specified line number.

Example:

    delete 1

This deletes line 1 from the document.

---

### 3. display

Displays all lines currently stored in the document along with their line numbers.

Example:

    display

Output:

    ---------- DOCUMENT ----------
    1: Hello World
    2: Welcome to our editor
    ------------------------------

---

### 4. save <filename>

Saves the current document to a text file.

Example:

    save notes.txt

This saves the document in the file named notes.txt.

---

### 5. load <filename>

Loads a text file into the editor.

Example:

    load notes.txt

This reads the contents of notes.txt into the editor.

---

### 6. help

Displays information about all available commands.

Example:

    help

---

### 7. exit

Exits the line editor.

Example:

    exit

---

## Notes

- Line numbers start from 1.
- The editor supports a maximum of 100 lines.
- Insert and delete operations update the line numbers automatically.
- The document is stored in memory while the editor is running.
- Save can be used to store the document permanently in a text file.
- Load can be used to restore a previously saved document.