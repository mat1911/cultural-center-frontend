# Application for cultural center management

## Brief description

It is the frontend part of an application that supports the management of cultural centres. 

The programme provides users with many functions, for example:
* sending messages to the institution,
* signing up for events and rating them,
* taking part in competitions and voting,
* writing articles,
* applying for jobs.

Confirmation of the event registration is sent by email to the user.

Users with the administrator role can additionally manage the content of all tabs and manage the visibility of work submitted by users.

The application was built according to the REST architectural style. Authentication and authorisation is carried out using JWT.
All files uploaded by users are stored in dropbox

Link to backend part: https://github.com/mat1911/cultural_center_management

## Configuration

For proper working, the application.properties file should be appropriately filled in.

Sample file content:

```properties
#DATABASE
spring.jpa.hibernate.ddl-auto=
spring.datasource.url=
spring.datasource.username=
spring.datasource.password=

#JWT TOKENS
tokens.access.expiration-time-ms=
tokens.refresh.expiration-time-ms=
tokens.refresh.property=access-token-expiration-time
tokens.prefix=Bearer

#DROPBOX
dropbox.accesstoken=
dropbox.datafolder=

#EMAIL
spring.mail.host = smtp.gmail.com
spring.mail.port = 587
spring.mail.properties.mail.smtp.starttls.enable = true
spring.mail.properties.mail.smtp.starttls.required = true
spring.mail.properties.mail.smtp.auth = true
spring.mail.properties.mail.smtp.connectiontimeout = 5000
spring.mail.properties.mail.smtp.timeout = 5000
spring.mail.properties.mail.smtp.writetimeout = 5000
spring.mail.username = 
spring.mail.password = 
```

## Screenshots

News page

![News page](https://github.com/mat1911/Screenshots/blob/main/Cultural_center/thesis_screenshot_1.PNG?raw=true)

<br />

Articles page

![Articles page](https://github.com/mat1911/Screenshots/blob/main/Cultural_center/thesis_screenshot_2.PNG?raw=true)

<br />

Page to manage article visibility by admin

![Admin - articles](https://github.com/mat1911/Screenshots/blob/main/Cultural_center/thesis_screenshot_5.PNG?raw=true)


<br />

Contact page

![Contact page](https://github.com/mat1911/Screenshots/blob/main/Cultural_center/thesis_screenshot_4.PNG?raw=true)


<br />

User events page

![User events page](https://github.com/mat1911/Screenshots/blob/main/Cultural_center/thesis_screenshot_6.PNG?raw=true)


<br />

Job offers page

![Job offers page](https://github.com/mat1911/Screenshots/blob/main/Cultural_center/thesis_screenshot_3.PNG?raw=true)

