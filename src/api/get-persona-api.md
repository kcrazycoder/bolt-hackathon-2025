 Replica Personas

Get Persona
===========

This endpoint returns a single persona by its unique identifier.

GET

/

v2

/

personas

/

{persona_id}

Request example:

    const options = {method: 'GET', headers: {'x-api-key': '<api-key>'}};
    
    fetch('https://tavusapi.com/v2/personas/{persona_id}', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));

Response example:

    {
      "data": [
        {
          "persona_id": "p5317866",
          "persona_name": "Life Coach",
          "system_prompt": "As a Life Coach, you are a dedicated professional who specializes in...",
          "default_replica_id": "r79e1c033f",
          "context": "Here are a few times that you have helped an individual make a breakthrough in...",
          "layers": {
            "llm": {
              "model": "<string>",
              "base_url": "your-base-url",
              "api_key": "your-api-key",
              "tools": [
                {
                  "type": "function",
                  "function": {
                    "name": "get_current_weather",
                    "description": "Get the current weather in a given location",
                    "parameters": {
                      "type": "object",
                      "properties": {
                        "location": {
                          "type": "string",
                          "description": "The city and state, e.g. San Francisco, CA"
                        },
                        "unit": {
                          "type": "string",
                          "enum": [
                            "celsius",
                            "fahrenheit"
                          ]
                        }
                      },
                      "required": [
                        "location"
                      ]
                    }
                  }
                }
              ],
              "headers": {
                "Authorization": "Bearer your-api-key"
              },
              "extra_body": {
                "temperature": 0.5
              }
            },
            "tts": {
              "api_key": "your-api-key",
              "tts_engine": "cartesia",
              "external_voice_id": "external-voice-id",
              "voice_settings": {
                "speed": "normal",
                "emotion": [
                  "positivity:high",
                  "curiosity"
                ]
              },
              "playht_user_id": "your-playht-user-id",
              "tts_emotion_control": "false",
              "tts_model_name": "sonic"
            },
            "perception": {
              "perception_model": "raven-0",
              "ambient_awareness_queries": [
                "Is the user showing an ID card?",
                "Does the user appear distressed or uncomfortable?"
              ],
              "perception_tool_prompt": "You have a tool to notify the system when an ID card is detected, named `notify_if_id_shown`. You MUST use this tool when a form of ID is detected.",
              "perception_tools": [
                {
                  "type": "function",
                  "function": {
                    "name": "notify_if_id_shown",
                    "description": "Use this function when a drivers license or passport is detected in the image with high confidence. After collecting the ID, internally use final_ask()",
                    "parameters": {
                      "type": "object",
                      "properties": {
                        "id_type": {
                          "type": "string",
                          "description": "best guess on what type of ID it is"
                        }
                      },
                      "required": [
                        "id_type"
                      ]
                    }
                  }
                }
              ]
            },
            "stt": {
              "stt_engine": "tavus-turbo",
              "participant_pause_sensitivity": "low",
              "participant_interrupt_sensitivity": "low",
              "hotwords": "This is a hotword example",
              "smart_turn_detection": true
            }
          },
          "created_at": "",
          "updated_at": "<string>"
        }
      ]
    }

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

#### Response

200 - application/json

[​](#response-data)

data

object\[\]

Hide child attributes

[​](#response-data-persona-id)

persona_id

string

A unique identifier for the persona.

Example:

`"p5317866"`

[​](#response-data-persona-name)

persona_name

string

A name for the persona.

Example:

`"Life Coach"`

[​](#response-data-system-prompt)

system_prompt

string

The system prompt that will be used by the llm.

Example:

`"As a Life Coach, you are a dedicated professional who specializes in..."`

[​](#response-data-default-replica-id)

default\_replica\_id

string

The default replica_id associated with this persona if one exists.

Example:

`"r79e1c033f"`

[​](#response-data-context)

context

string

The context that will be used by the llm.

Example:

`"Here are a few times that you have helped an individual make a breakthrough in..."`

[​](#response-data-layers)

layers

object

Show child attributes

[​](#response-layers-llm)

layers.llm

object

Show child attributes

[​](#response-layers-tts)

layers.tts

object

Show child attributes

[​](#response-layers-perception)

layers.perception

object

Show child attributes

[​](#response-layers-stt)

layers.stt

object

Show child attributes

[​](#response-data-created-at)

created_at

string

The date and time the persona was created.

Example:

`""`

[​](#response-data-updated-at)

updated_at

string

The date and time of when the persona was last updated.