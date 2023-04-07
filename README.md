# Hacker Clues

Live: https://drosehnal.github.io/hacker-clues/

## Log
### 02 Apr
- Kinda works, yay.
- I haven't considered all API quirks, my schema is probably too strict.
- Pagination is not perfect, not sure if this is due to the above
- Still have to deal with comments and user profiles although this is probably out of scope.
- I'm not happy with the component structure, but it will do for now.

### 29 Mar
- Project setup done
- I'm assuming serious testing is out of scope
- I'm not going to bother with jsdoc for now
- Using [https://ajv.js.org](ajv) to validate json schema, it can work with ts types
- Wrote partial types for search api results


## Requirements
- [ ] I need ui consuming http://hn.algolia.com/api/v1/search?query= and value of the query to come from a textbox
- [x] make a react project consuming this api , using typescript
- [x] with pagination 
- [x] use TailwindCSS ( it would be helpful if you learn this as we are using it in the project )
- you need to commit everything to github
- [x] i need an invite
- [ ] make everything live on github
    - ghpages should do nicely
    - S mentioned render.com, but I can't use a free account