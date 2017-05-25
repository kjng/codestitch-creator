## Codestitch Pad Creator

This Node.js program generates codestitch.io pads. Codestitch pads are isolated JavaScript code environments that allow multiple users to share and run JS code in real-time.

While I was a Hacker in Residence at Hack Reactor, I gave lectures for the prep program in which I needed to assign each student a codestitch pad to work in. I wrote this Node.js program to simplify the process.

### Usage

1. Clone this repo
2. Run `npm install` to install dependencies
3. Run `npm start` to start the pad creator
4. Enter in your codestitch username, password, and the number of pads to generate
5. WARNING! **Be careful not to accidently enter too high of a number of generated pads!** If this happens, press `Ctrl+C` to exit the program.
6. If all goes well, your generated pads will be logged!
7. Example Output (one link per line):
    ```
    https://codestitch.io/abcdefgh
    https://codestitch.io/ijklmnop
    https://codestitch.io/qrstuvwx
    ```

### Dependencies

- Node/npm
- prompt
- nightmare

### Bugs/Issues/Contributing

Feel free to open a pull request or submit a Github issue.