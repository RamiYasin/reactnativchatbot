# Naming conventions

## Components

The name of components must be written in PascalCase. For example ``ChatComponent.tsx`` or `ChatInput`

## Variables

Variable names should be declared in camelCase. For example `listItem`

## Tests

Tests are encapsulated by a describing test suite. One test suite tests one component. The describing text contains the
name of the component to be tested.</br> A test must start with the identifier `it` followed by 'should' in the
description for the test
Here's a skeleton test suite:

````
describe('ChatComponent', () => {
    it('should ...', () => {
        // testing code
    });
});
````

## Files
See [folder_structure](folder_structure.md)
