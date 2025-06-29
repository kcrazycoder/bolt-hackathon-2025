 Replica Personas

Delete Persona
==============

This endpoint deletes a single persona by its unique identifier.

DELETE

/

v2

/

personas

/

{persona_id}

Try it

cURL

Python

JavaScript

PHP

Go

Java

Copy

Ask AI

    const options = {method: 'DELETE', headers: {'x-api-key': '<api-key>'}};
    
    fetch('https://tavusapi.com/v2/personas/{persona_id}', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));

#### Authorizations

[​](#authorization-x-api-key)

x-api-key

string

header

required

#### Path Parameters

[​](#parameter-persona-id)

persona_id

string

required
