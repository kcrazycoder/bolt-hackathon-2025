 Conversational Video Interface

Creating a Conversation
=======================

> Creating a conversation immediately starts accumulating usage.
> 
> When you create a conversation CVI immediately starts running and the replica waits in the WebRTC/Daily room listening for your participant to join. Your billing/credit usage starts as soon as the conversation is creating and runs until the conversation timeout or when you end the conversation. This also uses up one of your concurrency spots.

[​](#how-do-i-create-a-conversation%3F)

How do I create a conversation?
==========================================================================

Once you have a persona you’d like to use or a replica, starting a conversation is easy. You can use the [Create Conversation](/api-reference/conversations/create-conversation) endpoint to do so. Alternatively you can start a conversation on the developer app by visiting the [Create Conversation page](https://platform.tavus.io/conversations/create).

[​](#what-does-creating-a-conversation-do%3F)

What does creating a conversation do?
======================================================================================

Creating a conversation is ‘starting the call’. Imagine you create a Zoom call and join the meeting- that’s what happens when you create a conversation.

1.  A WebRTC/Daily room is created
2.  The replica joins the room and waits for a participant to join
3.  Starts the timers on duration/timeouts (see Call Time Settings)

In response to creating a conversation, you receive a meeting URL (that looks like this: [https://tavus.daily.co/ca980e2e](https://tavus.daily.co/ca980e2e)). You or your participant can directly join this link and be put into a video conferencing room where you can immediately start conversing with the replica. **However, you do not have to use this meeting UI.** You can create a completely custom UI or access the raw streams.

[Learn about how to customize Daily UI](https://docs.daily.co/guides/products/client-sdk)

[Use our examples as a starting point](https://github.com/Tavus-Engineering/tavus-examples)

### 

[​](#what-is-daily%3F)

What is Daily?

Daily is our WebRTC provider. You do not have to create a Daily account. We have partnered with Daily to allow you to get an end to end solution without having to worry about WebRTC. You can build a completely custom application with CVI while accessing the Daily streams like you would with WebRTC.

[​](#what-can-i-customize-per-conversation%3F)

What can I customize per conversation?
========================================================================================

Conversation specific customizations are focused on allowing personalization of a conversation to a specific participant. As an example you might want to have a custom introduction per person, or change the language the replica is listening for and responds in. Meanwhile persona level configurations are settings or defaults applied to all conversations so you do not have to configure them each time, such as setting up your LLM.

Here are the things you can customize per conversation:

### 

[​](#persona-%2F-replica)

Persona / Replica

In order to start a conversation you must provide a persona or replica. If you provide a replica with no persona, the default Tavus persona will be used. Providing a persona without a replica will use the default replica attached to the persona if it exists. Providing a replica ID will override the default one associated with the persona.

### 

[​](#conversation-context)

Conversation Context

Conversation context is specific information or instructions for the LLM related to this conversation. For example it can contain information on who is joining the call as well as any specific information on the point of the call, background information or current information.

Example of conversation context:

> You are talking to Michael Seibel, who works at Y Combinator as a Group Partner and Managing Director of YC early stage. You are talking to him about your new startup idea for a pet rock delivery service. Get his advice and convince him to invest. It’s Monday, October 7th here in SF and the weather is clear and a crisp 68 degrees. Here’s a little more about Michael: He joined YC in 2013 as a Part-time Partner and in 2014 as a full-time Group Partner. Michael also serves on the board of two YC companies, Reddit and Dropbox. He moved to the bay area in 2006, and was a co-founder and CEO of two Y Combinator startups Justin.tv/Twitch (2007 - 2011) and Socialcam (2011 - 2012). In 2012 Socialcam sold to Autodesk Inc. for `$60m` (link) and in 2014, under the leadership of Emmett Shear (CEO) and Kevin Lin (COO) Twitch sold to Amazon for `$970m` (link). Before getting into tech, Michael spent 2006 as the finance director for a US Senate campaign in Maryland. In 2005, he graduated from Yale University with a bachelor’s degree in political science. Today he spends the large majority of his free time cooking, reading, traveling, and going for long drives. Michael lives in San Francisco, CA with his wife Sarah, son Jonathan, and daughter Jessica. Michael can be direct but he is a giant teddy bear if you get to know him.

The conversation context will be appended to the system prompt and the persona context/knowledge base.

### 

[​](#custom-greeting)

Custom Greeting

When a participant joins the replica will say a greeting that you can customize. You can use this to personalize a welcome message for someone or prompt them to start a conversation.

By default the replica will say “Hey there, how’s it going? What can I do for you today?”.

### 

[​](#language)

Language

You can customize what language CVI understands and speaks in. For example you could set the conversation to be in Spanish, or “multilingual” for dynamic multilingual support. Setting the language ensures the layers (ASR/TTS) are configured correctly to handle the language. If you are using your own TTS voice, you’ll need to make ensure it supports the language you specify.

### 

[​](#call-time-settings-max-duration-and-timeouts)

Call time settings (max duration and timeouts)

You can specify duration and timeouts for conversations. This is important to prevent unnecessary usage that incurs billing and uses up your max concurrency spots, as well as makes sure your users only use the allocated time you provide them.

There are 3 timeouts you can configure:

* Max duration: The maximum duration of the call in seconds. The default max\_call\_duration is 3600 seconds (1 hour). Once the time limit specified by this parameter has been reached, the conversation will automatically shut down.
* Participant left timeout: The duration in seconds after which the call will be automatically shut down once the last participant leaves. Default is 0 seconds, meaning the call will shutdown immediately after all participants leave. Note that this includes all additional observers, participants, or clients which you may have added to the meeting.
* Participant absent timeout: Starting from conversation creation, the duration in seconds after which the call will be automatically shut down if no participant joins the call. Default is 300 seconds (5 minutes).

### 

[​](#green-screen-%2F-transparent-background)

Green screen / Transparent Background

If enabled, the background of the replica will be replaced with a green screen (RGB values: \[0, 255, 155\]). You can use WebGL on the frontend to make the green screen transparent or change its color.

[Quick Start](/sections/conversational-video-interface/quick-start)[Creating a Persona](/sections/conversational-video-interface/creating-a-persona)

[linkedin](https://www.linkedin.com/company/tavus-io/)[discord](https://discord.gg/5Y9Er6WNN5)

[Powered by Mintlify](https://mintlify.com/preview-request?utm_campaign=poweredBy&utm_medium=referral&utm_source=docs.tavus.io)