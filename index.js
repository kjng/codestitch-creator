const Nightmare = require('nightmare');
const prompt = require('prompt');

// Instantiate nightmare
const nightmare = Nightmare();

// Delay (ms) for page switches. Increase if it is too low!
const delay = 2000;

// User input and generated pads
let email = '';
let password = '';
let padsToGenerate = 0;
let generatedPads = [];

// Runs main function
runner();

async function runner() {
  console.log('\n----------------------------');
  console.log('Codestitch Pad Creator version 1.0.0');
  console.log('Created by Kevin Jang');
  console.log('----------------------------\n');

  await promptForDetails();
  await codestitchLogin();

  console.log('Generating pads...');

  generatePads(padsToGenerate)
    .then(() => {
      console.log('\nDone!\n');
      console.log('Here are the generated pads:');
      console.log('----------------------------');
      console.log(generatedPads.join('\n'));
      process.exit();
    });
}

function promptForDetails() {
  console.log('Enter your Codestitch details.');

  prompt.start();
  return new Promise((resolve, reject) => {
    prompt.get([
      {
        name: 'email',
        required: true
      },
      {
        name: 'password',
        required: true,
        hidden: true
      },
      {
        name: 'padsToGenerate',
        type: 'integer',
        required: true,
      }
    ],
    function(err, results) {
      if (err) { reject(err); }

      email = results.email;
      password = results.password;
      padsToGenerate = results.padsToGenerate;

      console.log(`\nLogging in with details: ${email}, ${'*'.repeat(password.length)}`);

      resolve(email, password, padsToGenerate);
    });
  });
}

function codestitchLogin() {
  return new Promise((resolve, reject) => {
    nightmare
      .goto('https://codestitch.io/pads')
      .type('#user_email', email)
      .type('#user_password', password)
      .click('input[value="Sign in"') // not as dynamic
      .wait(delay)
      .url()
      .then((url) => {
        if (url === 'https://codestitch.io/pads') {
          console.log('Login successful!\n');
          resolve(url);
        } else {
          console.log(`\n:( Login failed. URL is ${url}\nExiting...\n`);
          process.exit();
        }
      })
      .catch((err) => {
        console.log('\nSomething went wrong. Check your network connection or increase the delay in index.js (line 8).');
        console.log(err);
        reject(err);
        process.exit();
      });
  });
}

async function generatePads(n) {
  for (let i = 0; i < n; i++) {
    generatedPads.push(await generatePad(i));
  }
}

function generatePad(i) {
  return new Promise((resolve, reject) => {
    nightmare.goto('https://codestitch.io/pads/new')
    .wait(delay)
    .url()
    .then((url) => {
      console.log(`Pad number ${i+1} generated! ${url}`);
      resolve(url);
    })
    .catch(err => reject(err));
  });
}
