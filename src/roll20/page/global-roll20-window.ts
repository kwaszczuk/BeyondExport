import { Roll20Window } from '@typings/roll20'

// Replace global @window typing with the one matching Roll20 environment.
// NOTE: It does not impact extension's runtime!
//       Only development environment is affected by making compiler/linter aware of Roll20 @window typing.
declare global {
    interface Window extends Roll20Window {
    }
}

export { };