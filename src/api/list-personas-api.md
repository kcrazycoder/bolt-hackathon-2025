 Replica Personas

List Personas
=============

This endpoint returns a list of all Personas created by the account associated with the API Key in use.

GET

/

v2

/

personas

Try it

cURL

Python

JavaScript

PHP

Go

Java

Copy

Ask AI

    const options = {method: 'GET', headers: {'x-api-key': '<api-key>'}};
    
    fetch('https://tavusapi.com/v2/personas', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));

200

Copy

Ask AI

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
              ]
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
      ],
      "total_count": 123
    }

#### Authorizations

[​](#authorization-x-api-key)

x-api-key

string

header

required

#### Query Parameters

[​](#parameter-limit)

limit

integer

The number of personas to return per page. Default is 10.

[​](#parameter-page)

page

integer

The page number to return. Default is 1.

[​](#parameter-persona-type)

persona_type

enum&lt;string&gt;

Filter the personas by type. Possible values: user, system. System personas are personas that have been created by Tavus.

Available options:

`user`,

`system`

#### Response

200 - application/json

[​](#response-data)

data

object\[\]

Show child attributes

[​](#response-total-count)

total_count

integer

The total number of personas given the filters provided.