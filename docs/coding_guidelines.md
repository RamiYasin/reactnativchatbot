# Coding guidelines

## Indentation

Indents have to be two spaces for one tab. Continuous lines should also be indented with one extra tab.
Example:

````
const myFunc = () => {
  // two spaces indented
  const myVariable = 'hello world'
  
  axios.get('google.de')
    .then((response) => {...})
    .catch((error) => {...})
  ;
};
````

## Semicolon

Commands have to end with a semicolon. It is not allowed to write two commands seperated with a semicolon in one row
Example:

````
// not allowed
const myFunc = () => {
    const myVar = 'hello world'; const myVar2 = 42;
    
    const myVar3 = 'foo'
}

-----------------------------------------------------------
// allowed
const myFunc = () => {
    const myVar = 'hello world'; 
    const myVar2 = 42;
    
    const myVar3 = 'foo';
}
````

## Line length

One should not have more than 120 letters. Longer commands have to break down to a second line below

## Import statement

Whenever you have to go more than one directory upwards you should use `~`. This path starts from /src
<br>Example:

````
// don't to this
import { myFunc } from '../../../components/myFile.tsx'
--------------------------------------------------------

// do this
import { myFunc } from '~/components/myFile.tsx'
````

## Functions
Functions should be declared as arrow functions instead of the usage of `function`
<br>Example
````
// not allowed
function myFunc() {
    
}
--------------------------
// allowed
const myFunc = () => {

}
````

## If statements
If statements should always have curly braces.
<br>Example
````
// not allowed
if (something === true) 
    // command in one row
    
-------------------------------------
// allowed
if (something === true) {
    // commands
}
````


## Quotes

All quotes are single quoted

## Debugging

It is strongly recommended to debug code with the integrated debug tool instead of using `console.log()`. Logging
statements won't pass the pipeline

## Variable and type declaration

Variables have to be declared with `let or const`. Whenever a variable doesn't change its state the variable should be
declared with `const`.
As for the variable declaration as well as props, states etc. you should declare the type of it.
<br>Example:
````
// not allowed
var myVar = 42;

const myFunc = (myParam) => {};

------------------------------------------
// allowed
let myVar = "hello world";
const myVar2:AnInterface = {};

const myFunc = (myParam: string) => {};
````

## Type and interface usage
Use interfaces for object declarations. Types will be used for custom type declarations
<br>Example
````
interface MyInterface {
    firstAttr: string;
    secondAttr: number;
}

type CustomType = number | string;
````

## Git

### Branch names

Branches should start with `feat or fix`. Depending on the intention of the issue. For the second prefix should come the
issue number followed by a very short description of the changes. <br>
Example:

````
feat/42-add_guidelines
````

Branches should be destroyed after being merged.

### Commit messages

Commit messages should begin with one of the following tags `[task] [fix] [docs] [refactor]` followed by the issue
number. This number is prefixed by a '#' symbol. After that comes a short description of the commit.
<br>Example:

````
[docs](#42) added coding guidelines
````
