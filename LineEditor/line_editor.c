#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_LINES 100
#define MAX_LINE_LENGTH 200

char *lines[MAX_LINES];
int lineCount = 0;

/* Function prototypes */
void insertLine(int lineNumber, char text[]);
void deleteLine(int lineNumber);
void displayDocument(void);
void saveFile(char filename[]);
void loadFile(char filename[]);
void freeDocument(void);
void showHelp(void);

int main()
{
    char command[300];
    char action[20];

    printf("=================================\n");
    printf("       SIMPLE LINE EDITOR\n");
    printf("=================================\n");

    printf("Type 'help' to see available commands.\n");

    while (1)
    {
        printf("\n> ");

        if (fgets(command, sizeof(command), stdin) == NULL)
        {
            break;
        }

        /* Remove newline from command */
        command[strcspn(command, "\n")] = '\0';

        /* Get the first word of the command */
        if (sscanf(command, "%19s", action) != 1)
        {
            continue;
        }

        /* INSERT command */
        if (strcmp(action, "insert") == 0)
        {
            int lineNumber;
            char text[MAX_LINE_LENGTH];

            if (sscanf(command + 6, "%d %[^\n]", &lineNumber, text) == 2)
            {
                insertLine(lineNumber, text);
            }
            else
            {
                printf("Usage: insert <line number> <text>\n");
            }
        }

        /* DELETE command */
        else if (strcmp(action, "delete") == 0)
        {
            int lineNumber;

            if (sscanf(command + 6, "%d", &lineNumber) == 1)
            {
                deleteLine(lineNumber);
            }
            else
            {
                printf("Usage: delete <line number>\n");
            }
        }

        /* DISPLAY command */
        else if (strcmp(action, "display") == 0)
        {
            displayDocument();
        }

        /* SAVE command */
        else if (strcmp(action, "save") == 0)
        {
            char filename[100];

            if (sscanf(command + 4, "%99s", filename) == 1)
            {
                saveFile(filename);
            }
            else
            {
                printf("Usage: save <filename>\n");
            }
        }

        /* LOAD command */
        else if (strcmp(action, "load") == 0)
        {
            char filename[100];

            if (sscanf(command + 4, "%99s", filename) == 1)
            {
                loadFile(filename);
            }
            else
            {
                printf("Usage: load <filename>\n");
            }
        }

        /* HELP command */
        else if (strcmp(action, "help") == 0)
        {
            showHelp();
        }

        /* EXIT command */
        else if (strcmp(action, "exit") == 0)
        {
            freeDocument();

            printf("Goodbye!\n");
            break;
        }

        /* Unknown command */
        else
        {
            printf("Unknown command. Type 'help' for available commands.\n");
        }
    }

    return 0;
}


/* Insert a new line */
void insertLine(int lineNumber, char text[])
{
    int i;

    if (lineCount >= MAX_LINES)
    {
        printf("Document is full. Cannot insert more lines.\n");
        return;
    }

    if (lineNumber < 1 || lineNumber > lineCount + 1)
    {
        printf("Invalid line number.\n");
        printf("You can insert from line 1 to %d.\n", lineCount + 1);
        return;
    }

    /* Shift lines downward */
    for (i = lineCount; i >= lineNumber; i--)
    {
        lines[i] = lines[i - 1];
    }

    /* Allocate memory for new line */
    lines[lineNumber - 1] = malloc(strlen(text) + 1);

    if (lines[lineNumber - 1] == NULL)
    {
        printf("Memory allocation failed.\n");
        return;
    }

    strcpy(lines[lineNumber - 1], text);

    lineCount++;

    printf("Line inserted successfully.\n");
}


/* Delete a line */
void deleteLine(int lineNumber)
{
    int i;

    if (lineCount == 0)
    {
        printf("Document is empty.\n");
        return;
    }

    if (lineNumber < 1 || lineNumber > lineCount)
    {
        printf("Invalid line number.\n");
        return;
    }

    /* Free memory of the line being deleted */
    free(lines[lineNumber - 1]);

    /* Shift remaining lines upward */
    for (i = lineNumber - 1; i < lineCount - 1; i++)
    {
        lines[i] = lines[i + 1];
    }

    lines[lineCount - 1] = NULL;

    lineCount--;

    printf("Line deleted successfully.\n");
}


/* Display the document */
void displayDocument(void)
{
    int i;

    if (lineCount == 0)
    {
        printf("Document is empty.\n");
        return;
    }

    printf("\n---------- DOCUMENT ----------\n");

    for (i = 0; i < lineCount; i++)
    {
        printf("%d: %s\n", i + 1, lines[i]);
    }

    printf("------------------------------\n");
}


/* Save document to a file */
void saveFile(char filename[])
{
    FILE *file;
    int i;

    file = fopen(filename, "w");

    if (file == NULL)
    {
        printf("Could not open file for saving.\n");
        return;
    }

    for (i = 0; i < lineCount; i++)
    {
        fprintf(file, "%s\n", lines[i]);
    }

    fclose(file);

    printf("Document saved to %s successfully.\n", filename);
}


/* Load document from a file */
void loadFile(char filename[])
{
    FILE *file;
    char buffer[MAX_LINE_LENGTH];

    file = fopen(filename, "r");

    if (file == NULL)
    {
        printf("Could not open file.\n");
        return;
    }

    /* Remove existing document */
    freeDocument();

    while (fgets(buffer, sizeof(buffer), file) != NULL)
    {
        /* Remove newline */
        buffer[strcspn(buffer, "\n")] = '\0';

        if (lineCount >= MAX_LINES)
        {
            printf("Maximum line limit reached.\n");
            break;
        }

        lines[lineCount] = malloc(strlen(buffer) + 1);

        if (lines[lineCount] == NULL)
        {
            printf("Memory allocation failed.\n");
            break;
        }

        strcpy(lines[lineCount], buffer);

        lineCount++;
    }

    fclose(file);

    printf("Document loaded from %s successfully.\n", filename);
}


/* Free all allocated memory */
void freeDocument(void)
{
    int i;

    for (i = 0; i < lineCount; i++)
    {
        free(lines[i]);
        lines[i] = NULL;
    }

    lineCount = 0;
}


/* Display help */
void showHelp(void)
{
    printf("\n========== HELP ==========\n");

    printf("insert <number> <text>\n");
    printf("  Insert a line at the given line number.\n");
    printf("  Example: insert 1 Hello World\n\n");

    printf("delete <number>\n");
    printf("  Delete the line at the given line number.\n");
    printf("  Example: delete 1\n\n");

    printf("display\n");
    printf("  Display all lines with line numbers.\n\n");

    printf("save <filename>\n");
    printf("  Save the document to a text file.\n");
    printf("  Example: save notes.txt\n\n");

    printf("load <filename>\n");
    printf("  Load a text file into the editor.\n");
    printf("  Example: load notes.txt\n\n");

    printf("help\n");
    printf("  Display this help message.\n\n");

    printf("exit\n");
    printf("  Exit the line editor.\n");

    printf("==========================\n");
}