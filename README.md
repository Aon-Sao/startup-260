# Grep Awk Sed Repl

## Description deliverable

### Elevator pitch

Have you ever needed to find points of interest in a 5000 line error file, or wanted to fix someone else's formatting in a hundred different files? Do you not know how to create a test file? A Read Evaluate Print Loop for the excellent GNU tools Grep, Awk, and Sed allows you to cook up your very own BASH pipeline of horror, er, utility! Easily provide your own STDIN, write and revise your pipeline until STDOUT looks right and the commands look wrong (morally)!

### Design
I prefer login to be optional, and not to dominate the page.
![Mock](grepawksed_mock.svg)

This sequence diagram shows how Alice might sign in and start writing grep, awk, and sed commands. I may update it as I figure out how the backend works.

![REPL sequence diagram](grepawksed_backend_sequence.svg)

### Key features

- Secure login over HTTPS
- Ability to chain grep, awk, and sed by piping
- Display of stdout, stderr
- Ability to save stdin and commands written, publicly or privately
- Visibility of public commands from other users

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Plain and clear structure of the page, one page for log in and repl, a second to browse saved commands.
- **CSS** - Application styling that looks good, but is minimal. Good whitespace, plain color choice and contrast.
- **JavaScript** - Provides login, hides login once complete, possible linting, backend endpoint calls (what are those?).
- **Service** - Backend service with endpoints for:
  - login and registration
  - saving commands and stdin
  - retrieving saved commands and stdin
- **DB** - Store users, commands, and stdin in database.
- **Login** - Register and login users. Credentials securely stored in database. Guest users welcome.
- **WebSocket** - Record length command is broadcast to other users.
- **React** - Application ported to use the React web framework.
- **caddy-cgi** - To run gnu grep, awk, and sed. See the [GitHub](https://github.com/aksdb/caddy-cgi).