#Flash Messages in Django

[**DOCUMENTATION**](https://docs.djangoproject.com/en/1.9/ref/contrib/messages/)

###RECAP: 
One time messages. "Allows you to store messages in one request & retrieve them for display in a subsequent(usually next) request"

###Overview
In django, flashed messages are part of the messages app that is included in the generic django-admin startproject command. When used, a message object is added to the request object(via session/cookie) that is readily available for use in views or templates in subsequent requests. Each flash message is an instance of the Message class which has the following attributes:

* **message**: the actual message's text
* level: integer representation of message level
* **tags**: string that combines messages extra and level tags space-delimited
* **extra_tags**: custom string tags for this message
* level_tag: string tag representing level

In regular use, only the message, tags, and extra_tags are going to be directly interacted with. For more on the level and level_tag attributes, see below. What's important to note here is that you can effectively categorize your messages using the extra_tags. 

Regular use of flash messages is pretty open ended. The most common cases are to use it for alerting users of form field errors, success messages, warnings, and errors. To reiterate, anytime you need to alert a user of something *hopefully* only once, a flash message is great, effective method.

###Usage
In your **views.py**:

	from django.contrib import messages

__Creation__: you can add a message to be flashed by using this handy-dandy little line:

	messages.add_message(request, messagelevel, 'yourmessagehere')

If you are using a default message-level,such as 'INFO'(the default message-level) youcan use:

	messages.INFO(request, 'yourmessagehere')

__Display__: you can view a requests messages 

	from django.contrib.messages import get_messages

	memos = get_messages(request)
	for message in memos:
		...message...

Display in **template**:
* Step 1: check if messages
* Step 2: ITERATE through messages. *Iteration clears the messages from storage*
* This example prints each message and any tags associated with it


		{% if messages %}
			{% for message in messages %}
				<p>{{ message }} 
					{% if message.tags %}
					has these tags: {{message.tags }}
					{% endif %}</p>
			{% endfor %}
		{% endif %}




**Flash messages with Forms**:
When you used bound forms, django will take care of field-error flashing. However, if you wish to do it by hand or alter how it is normally handled you certainly can.  Additionally, there may be non-field specific errors associated with your form that you can handle with *non-field errors*. To learn more about handling specific field errors check out the [docs on manually rendering fields](https://docs.djangoproject.com/en/1.10/topics/forms/#rendering-fields-manually) or the [docs on how forms handle errors](https://docs.djangoproject.com/en/1.10/ref/forms/api/#how-errors-are-displayed). The gist of it is to use bound forms because django saves you a lot of work.


###Next Level...
__Message Level__: Messages have a level attribute that serves as a way to exclude certain types of messages from showing up. Each request has a **minimum level** that can be set in the views. An example of this is that in development, you can see debugging messages, but when you deploy the minimum level will be changed so that debug(the lowest level) messages won't be displayed. As with most things in django, these levels can be customized and added to, but it is recommended that **if you are making a reusable app, don't customize these**. For deeper information on levels, I once again refer you to the [docs](https://docs.djangoproject.com/en/1.10/ref/contrib/messages/#creating-custom-message-levels)

An overview of the built in message-levels

level | level_tag | value
----- | --------- | -----
DEBUG | debug | 10
INFO | info | 20
SUCCESS | success | 25
WARNING | warning | 30
ERROR | error | 40