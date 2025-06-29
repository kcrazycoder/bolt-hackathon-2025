 Replica Personas

Create Persona
==============

Create and customize a digital replica’s personality for Conversational Video Interface (CVI). A persona defines the replica’s behavior and capabilities through configurable layers including:

**Core Components:**

* Replica - Choice of audio/visual appearance
* Context - Customizable contextual information, for use by LLM
* System Prompt - Customizable system prompt, for use by LLM
* Layers
    
    * STT - Transcription, turn taking, and Sparrow-0 settings
    * LLM - Language model settings
    * TTS - Text-to-Speech settings
    
    * Perception - Multimodal vision and understanding settings (Raven-0)

When creating a conversation, the persona configuration determines how the replica interacts, processes information, and responds to participants. Each layer can be fine-tuned to achieve the desired conversational experience.

When using **full pipeline mode**, the `system_prompt` field is required.

POST

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

    const options = {
      method: 'POST',
      headers: {'x-api-key': '<api-key>', 'Content-Type': 'application/json'},
      body: '{"persona_name":"Life Coach","system_prompt":"As a Life Coach, you are a dedicated professional who specializes in...","pipeline_mode":"full","context":"Here are a few times that you have helped an individual make a breakthrough in...","default_replica_id":"r79e1c033f","layers":{"llm":{"model":"<string>","base_url":"your-base-url","api_key":"your-api-key","tools":[{"type":"function","function":{"name":"get_current_weather","description":"Get the current weather in a given location","parameters":{"type":"object","properties":{"location":{"type":"string","description":"The city and state, e.g. San Francisco, CA"},"unit":{"type":"string","enum":["celsius","fahrenheit"]}},"required":["location"]}}}],"headers":{"Authorization":"Bearer your-api-key"},"extra_body":{"temperature":0.5}},"tts":{"api_key":"your-api-key","tts_engine":"cartesia","external_voice_id":"external-voice-id","voice_settings":{"speed":"normal","emotion":["positivity:high","curiosity"]},"playht_user_id":"your-playht-user-id","tts_emotion_control":"false","tts_model_name":"sonic"},"perception":{"perception_model":"raven-0","ambient_awareness_queries":["Is the user showing an ID card?","Does the user appear distressed or uncomfortable?"],"perception_tool_prompt":"You have a tool to notify the system when an ID card is detected, named `notify_if_id_shown`. You MUST use this tool when a form of ID is detected.","perception_tools":[{"type":"function","function":{"name":"notify_if_id_shown","description":"Use this function when a drivers license or passport is detected in the image with high confidence. After collecting the ID, internally use final_ask()","parameters":{"type":"object","properties":{"id_type":{"type":"string","description":"best guess on what type of ID it is"}},"required":["id_type"]}}}]},"stt":{"stt_engine":"tavus-turbo","participant_pause_sensitivity":"high","participant_interrupt_sensitivity":"high","hotwords":"Roey is the name of the person you\'re speaking with.","smart_turn_detection":true}}}'
    };
    
    fetch('https://tavusapi.com/v2/personas', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));

200

Copy

Ask AI

    {
      "persona_id": "p5317866",
      "persona_name": "Life Coach",
      "created_at": "<string>"
    }

#### Authorizations

[​](#authorization-x-api-key)

x-api-key

string

header

required

#### Body

application/json

[​](#body-persona-name)

persona_name

string

A name for the persona.

Example:

`"Life Coach"`

[​](#body-system-prompt)

system_prompt

string

This is the system prompt that will be used by the llm.

Example:

`"As a Life Coach, you are a dedicated professional who specializes in..."`

[​](#body-pipeline-mode)

pipeline_mode

enum&lt;string&gt;

The pipeline mode to use for the persona. Possible values: `full`, `echo`. `full` will provide the default end-to-end experience. `echo` will turn off most steps, and allow the replica to sync video with audio passed in through Echo events, which it will speak out.

Available options:

`full`,

`echo`

[​](#body-context)

context

string

This is the context that will be used by the llm.

Example:

`"Here are a few times that you have helped an individual make a breakthrough in..."`

[​](#body-default-replica-id)

default\_replica\_id

string

The default replica\_id associated with this persona if one exists. When creating a conversation, a persona\_id with a default\_replica\_id associated can we used to create a conversation without specifying a replica_id.

Example:

`"r79e1c033f"`

[​](#body-layers)

layers

object

Hide child attributes

[​](#body-layers-llm)

layers.llm

object

Hide child attributes

[​](#body-layers-llm-model)

layers.llm.model

string

"The model name that will be used by the llm. To use Tavus' llms, you may select from the following models: `tavus-llama`, `tavus-gpt-4o`, `tavus-gpt-4o-mini`. If you would like to use your own OpenAI compatible llm, you may provide a `model`, `base_url`, and `api_key`."

#### Context Window Limit

* All Tavus-hosted models have a **limit of 120,000 tokens**.
* Contexts over **100,000 tokens** will experience noticeable performance degradation (slower response times).

> **Tip**: 1 token ≈ 4 characters, therefore 120,000 tokens ≈ 480,000 characters (including spaces and punctuation).

[​](#body-layers-llm-base-url)

layers.llm.base_url

string

The base url for your OpenAI compatible endpoint.

Example:

`"your-base-url"`

[​](#body-layers-llm-api-key)

layers.llm.api_key

string

The API key for the OpenAI compatible endpoint.

Example:

`"your-api-key"`

[​](#body-layers-llm-tools)

layers.llm.tools

any\[\]

Optional tools to provide to your custom LLM

Example:

    [  {    "type": "function",    "function": {      "name": "get_current_weather",      "description": "Get the current weather in a given location",      "parameters": {        "type": "object",        "properties": {          "location": {            "type": "string",            "description": "The city and state, e.g. San Francisco, CA"          },          "unit": {            "type": "string",            "enum": ["celsius", "fahrenheit"]          }        },        "required": ["location"]      }    }  }]

[​](#body-layers-llm-headers)

layers.llm.headers

object

Optional headers to provide to your custom LLM

Example:

    { "Authorization": "Bearer your-api-key" }

[​](#body-layers-llm-extra-body)

layers.llm.extra_body

object

Optional extra body to provide to your custom LLM

Example:

    { "temperature": 0.5 }

[​](#body-layers-tts)

layers.tts

object

Show child attributes

[​](#body-layers-perception)

layers.perception

object

Show child attributes

[​](#body-layers-stt)

layers.stt

object

Show child attributes

#### Response

200 - application/json

[​](#response-persona-id)

persona_id

string

A unique identifier for the persona.

Example:

`"p5317866"`

[​](#response-persona-name)

persona_name

string

The name of the persona.

Example:

`"Life Coach"`

[​](#response-created-at)

created_at

string

The date and time the persona was created.

Request example:

    const options = {
      method: 'POST',
      headers: {'x-api-key': '<api-key>', 'Content-Type': 'application/json'},
      body: '{"persona_name":"Life Coach","system_prompt":"As a Life Coach, you are a dedicated professional who specializes in...","pipeline_mode":"full","context":"Here are a few times that you have helped an individual make a breakthrough in...","default_replica_id":"r79e1c033f","layers":{"llm":{"model":"<string>","base_url":"your-base-url","api_key":"your-api-key","tools":[{"type":"function","function":{"name":"get_current_weather","description":"Get the current weather in a given location","parameters":{"type":"object","properties":{"location":{"type":"string","description":"The city and state, e.g. San Francisco, CA"},"unit":{"type":"string","enum":["celsius","fahrenheit"]}},"required":["location"]}}}],"headers":{"Authorization":"Bearer your-api-key"},"extra_body":{"temperature":0.5}},"tts":{"api_key":"your-api-key","tts_engine":"cartesia","external_voice_id":"external-voice-id","voice_settings":{"speed":"normal","emotion":["positivity:high","curiosity"]},"playht_user_id":"your-playht-user-id","tts_emotion_control":"false","tts_model_name":"sonic"},"perception":{"perception_model":"raven-0","ambient_awareness_queries":["Is the user showing an ID card?","Does the user appear distressed or uncomfortable?"],"perception_tool_prompt":"You have a tool to notify the system when an ID card is detected, named `notify_if_id_shown`. You MUST use this tool when a form of ID is detected.","perception_tools":[{"type":"function","function":{"name":"notify_if_id_shown","description":"Use this function when a drivers license or passport is detected in the image with high confidence. After collecting the ID, internally use final_ask()","parameters":{"type":"object","properties":{"id_type":{"type":"string","description":"best guess on what type of ID it is"}},"required":["id_type"]}}}]},"stt":{"stt_engine":"tavus-turbo","participant_pause_sensitivity":"high","participant_interrupt_sensitivity":"high","hotwords":"Roey is the name of the person you\'re speaking with.","smart_turn_detection":true}}}'
    };
    
    fetch('https://tavusapi.com/v2/personas', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));

Response example:
    {
      "persona_id": "p5317866",
      "persona_name": "Life Coach",
      "created_at": "<string>"
    }