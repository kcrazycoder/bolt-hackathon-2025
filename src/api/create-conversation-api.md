 Conversational Video Interface

Create Conversation
===================

With the Tavus Conversational Video Interface (CVI) you are able to create a `conversation` with a replica in real time.

### Conversations

A `conversation` is a video call with a replica.

After creating a `conversation`, a `conversation_url` will be returned in the response. The `conversation_url` can be used to join the conversation directly or can be embedded in a website. To embed the `conversation_url` in a website, you can find [instructions here](https://www.daily.co/products/prebuilt-video-call-app/quickstart/).

Once a conversation is created, the replica will automatically join the call and will start participating.

By providing a `callback_url`, you can receive webhooks with updates regarding the conversation state.

[Learn about recording conversations here](/sections/conversational-video-interface/recording-rooms).

* **If your persona does not have a default replica**, the `replica_id` is required.
* **If your persona has a default replica**, the `replica_id` is not required.
* **If your persona has a default replica and you define `replica_id`**, it will override the persona’s default replica.

POST

/

v2

/

conversations

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
      body: '{"replica_id":"r79e1c033f","persona_id":"p5317866","callback_url":"https://yourwebsite.com/webhook","conversation_name":"A Meeting with Hassaan","conversational_context":"You are about to talk to Hassaan, one of the cofounders of Tavus. He loves to talk about AI, startups, and racing cars.","custom_greeting":"Hey there Hassaan, long time no see!","properties":{"max_call_duration":3600,"participant_left_timeout":60,"participant_absent_timeout":300,"enable_recording":true,"enable_closed_captions":true,"apply_greenscreen":true,"language":"english","recording_s3_bucket_name":"conversation-recordings","recording_s3_bucket_region":"us-east-1","aws_assume_role_arn":""}}'
    };
    
    fetch('https://tavusapi.com/v2/conversations', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));

200

Copy

Ask AI

    {
      "conversation_id": "c123456",
      "conversation_name": "A Meeting with Hassaan",
      "status": "active",
      "conversation_url": "https://tavus.daily.co/c123456",
      "replica_id": "r79e1c033f",
      "persona_id": "p5317866",
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

[​](#body-replica-id)

replica_id

string

The unique identifier for the replica that will join the conversation.

Example:

`"r79e1c033f"`

[​](#body-persona-id)

persona_id

string

The unique identifier for the persona that the replica will use in the conversation.

Example:

`"p5317866"`

[​](#body-callback-url)

callback_url

string

A url that will receive webhooks with updates regarding the conversation state.

Example:

`"https://yourwebsite.com/webhook"`

[​](#body-conversation-name)

conversation_name

string

A name for the conversation.

Example:

`"A Meeting with Hassaan"`

[​](#body-conversational-context)

conversational_context

string

Optional context that will be appended to any context provided in the persona, if one is provided.

Example:

`"You are about to talk to Hassaan, one of the cofounders of Tavus. He loves to talk about AI, startups, and racing cars."`

[​](#body-custom-greeting)

custom_greeting

string

An optional custom greeting that the replica will give once a participant joines the conversation.

Example:

`"Hey there Hassaan, long time no see!"`

[​](#body-properties)

properties

object

Optional properties that can be used to customize the conversation.

Show child attributes

#### Response

200 - application/json

[​](#response-conversation-id)

conversation_id

string

A unique identifier for the conversation.

Example:

`"c123456"`

[​](#response-conversation-name)

conversation_name

string

The name of the conversation.

Example:

`"A Meeting with Hassaan"`

[​](#response-status)

status

string

The status of the conversation. Possible values: `active`, `ended`.

Example:

`"active"`

[​](#response-conversation-url)

conversation_url

string

A direct link to join the conversation. This link can be used to join the conversation directly or can be embedded in a website.

Example:

`"https://tavus.daily.co/c123456"`

[​](#response-replica-id)

replica_id

string

A unique identifier for the replica used to create this conversation.

Example:

`"r79e1c033f"`

[​](#response-persona-id)

persona_id

string

A unique identifier for the persona used to create this conversation.

Example:

`"p5317866"`

[​](#response-created-at)

created_at

string

The date and time the conversation was created.

[Rename Replica](/api-reference/replica-model/patch-replica-name)[Get Conversation](/api-reference/conversations/get-conversation)

[linkedin](https://www.linkedin.com/company/tavus-io/)[discord](https://discord.gg/5Y9Er6WNN5)

[Powered by Mintlify](https://mintlify.com/preview-request?utm_campaign=poweredBy&utm_medium=referral&utm_source=docs.tavus.io)