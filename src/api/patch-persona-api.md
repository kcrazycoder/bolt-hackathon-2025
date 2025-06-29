 Replica Personas

Patch Persona
=============

This endpoint updates a persona using a JSON Patch payload (RFC 6902). You can modify **any field within the persona** using supported operations like `add`, `remove`, `replace`, `copy`, `move`, and `test`.

For example:

Ensure the `path` match the current persona schema.

    [
      { "op": "replace", "path": "/persona_name", "value": "Wellness Advisor" },
      { "op": "replace", "path": "/default_replica_id", "value": "r79e1c033f" },
      { "op": "replace", "path": "/context", "value": "Here are a few times that you have helped an individual make a breakthrough in..." },
      { "op": "replace", "path": "/layers/llm/model", "value": "tavus-gpt-4o" },
      { "op": "replace", "path": "/layers/tts/tts_engine", "value": "cartesia" },
      { "op": "add", "path": "/layers/tts/tts_emotion_control", "value": "true" },
      { "op": "remove", "path": "/layers/stt/hotwords" },
      { "op": "replace", "path": "/layers/perception/perception_tool_prompt", "value": "Use tools when identity documents are clearly shown." }
    ]
    

PATCH

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

    const options = {
      method: 'PATCH',
      headers: {'x-api-key': '<api-key>', 'Content-Type': 'application/json'},
      body: '[{"op":"add","path":"/layers/llm/model","value":"tavus-llama"}]'
    };
    
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

#### Body

application/json · object\[\]

[​](#body-op)

op

enum&lt;string&gt;

required

The operation to perform. Must be one of: add, remove, replace, copy, move, test

Available options:

`add`,

`remove`,

`replace`,

`copy`,

`move`,

`test`

Example:

`"add"`

[​](#body-path)

path

string

required

A JSON Pointer string that references a location within the target document where the operation is performed

Example:

`"/layers/llm/model"`

[​](#body-value)

value

string

required

The value to be used within the operation. Required for add and replace operations

Example:

`"tavus-llama"`

#### Response

200

200304400422

OK
