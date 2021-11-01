# GetYourTable

## API: https://getyourtable.herokuapp.com
## CLIENT: https://getyourtable.tk/
## CLIENT REPOSITORY: https://github.com/GiovannaK/Restaurant-Booking-Client
### Demo Credentials
#### Normal user
- E-MAIL: yeway40067@goqoez.com
- PASSWORD: getyourtable

#### Restaurant manager user
- E-MAIL: mimepam980@httptuan.com
- PASSWORD: getyourtable
---

### Table of Contents
Find yourself here

- [Description](#description)
- [Features](#Features)
- [Endpoints](#Endpoints)
- [How To Use](#how-to-use)
- [License](#license)
- [Author Info](#author-info)

---

## Description
GetYourTable is a web app for restaurant table booking. It is possible to manage restaurants and bookings for each restaurant separately in real time. In addition to making bookings at specific times with special requests and receiving response to the request in real time and by email.

## Technologies

### Database
- MongoDB

### Back-end
- NodeJS

### Services

- Amazon S3 bucket for images -> https://aws.amazon.com/pt/s3/
- Sendgrid for e-mails -> https://sendgrid.com/

---
## Features

### REGISTRATION

### There are two types of primary users. Restaurant manager and users who request reservations. You can register using name, last name, email, password and phone number.

### ACCOUNT ACTIVATION
- When a user finish registration proccess, before login, the account must be activated. A short expiration token will be sent to the user's email.

### LOGIN

- It is possible to log in using e-mail and password, if account is not activated it will not be possible to login.

### FORGOT PASSWORD

- Users can recover access to the account by requesting a password change.
- A short expiration token will be sent to the user's email with a link to the password reset form.

### PROFILE

- Users can change their personal data
- Track bookings in real time and receive an email if booking was approved or rejected

### RESTAURANT MANAGER PROFILE

- Can change their personal data
- Manage multiple restaurants
- Create new restaurants
- Update restaurants information
- Upload restaurant images (drag and drop)
- Track real-time bookings for each restaurant separately

### SEARCH
- It is possible to search restaurants by name and city

### CATEGORIES

- 20 restaurant categories 

### BOOKINGS
- Users can choose how many companions will take
- Choose dates according to the restaurant's opening hours
- it is possible to request additional

--- 

## Endpoints
### BASE URL -> https://getyourtable.herokuapp.com

### HOME ENDPOINTS

```html
Show all restaurants

GET

https://getyourtable.herokuapp.com/
```
```html
Show restaurant by id

GET

https://getyourtable.herokuapp.com/:restaurantId
```
```html
Show restaurant reviews

GET

https://getyourtable.herokuapp.com/reviews/:restaurantId
```

```html
Search restaurants by name or city

GET

https://getyourtable.herokuapp.com/search?q=Rio%20de%20Janeiro
```

### RESTAURANT ENDPOINTS (Only for restaurant managers)

```html
Create restaurant 

JWT token required

POST

https://getyourtable.herokuapp.com/restaurant/register_restaurant
```

```html
Show all user restaurants

JWT token required

GET

https://getyourtable.herokuapp.com/restaurant/
```

```html
Show restaurant by id

JWT token required

GET

https://getyourtable.herokuapp.com/restaurant/:restauratId
```

```html
Update restaurant by id

JWT token required

PUT

https://getyourtable.herokuapp.com/restaurant/:restauratId
```

```html
Delete restaurant by id

JWT token required

DELETE

https://getyourtable.herokuapp.com/restaurant/:restauratId
```
### RESTAURANT CATEGORY ENDPOINTS
```html
Show all categories

GET

https://getyourtable.herokuapp.com/restaurant_categories/
```
```html
Show restaurants by category

GET

https://getyourtable.herokuapp.com/restaurant_categories/:categoryId
```
### RESTAURANT BOOKINGS (Only for restaurant managers)

```html
Show all bookings for a restaurant 

JWT token required

GET

https://getyourtable.herokuapp.com/restaurant_bookings/:restaurantId
```
```html
Approve bookings for specific restaurant

JWT token required

POST

https://getyourtable.herokuapp.com/restaurant_bookings/approvals/:bookingId
```
```html
Reject bookings for specific restaurant

JWT token required

POST

https://getyourtable.herokuapp.com/restaurant_bookings/rejects/:bookingId
```

### RESTAURANT IMAGES ENDPOINT (Only for restaurant managers)

```html
Upload image for specific restaurant

JWT token required

POST

https://getyourtable.herokuapp.com/images/upload/restaurantId
```
```html
Show all images for specific restaurant

JWT token required

GET

https://getyourtable.herokuapp.com/images/restaurantId
```

```html
Show all images for specific restaurant

JWT token required

GET

https://getyourtable.herokuapp.com/images/restaurantId
```
```html
Delete image by id

JWT token required

DELETE

https://getyourtable.herokuapp.com/images/imageId
```
### PROFILE ENDPOINTS

```html
Show user personal information

JWT token required

GET

https://getyourtable.herokuapp.com/user/profile
```
```html
Update user personal information

JWT token required

PUT

https://getyourtable.herokuapp.com/user/profile
```
### USER REQUESTED BOOKINGS

```html
Show all requested bookings for specific user

JWT token required

GET

https://getyourtable.herokuapp.com/user_bookings/
```
```html
Show informations for specific booking

JWT token required

GET

https://getyourtable.herokuapp.com/user_bookings/:bookingId
```

### BOOKING SPECIAL DATES

```html
Show all special date options

GET

https://getyourtable.herokuapp.com/special_dates/
```

### BOOKING REVIEW

```html
Create review for specific booking

JWT token required

GET

https://getyourtable.herokuapp.com/review/:bookingId
```
### SESSION

```html
Register a normal user

POST

https://getyourtable.herokuapp.com/session/register
```
```html
Register a restaurant manager

POST

https://getyourtable.herokuapp.com/session/register_partners
```

```html
Active user account

POST

https://getyourtable.herokuapp.com/session/account_confirmation/:confirmationToken
```
```html
Login

POST

https://getyourtable.herokuapp.com/session/login
```
```html
Send email with link to reset password

POST

https://getyourtable.herokuapp.com/session/forgot_password
```
```html
Reset user password

PUT

https://getyourtable.herokuapp.com/session/reset_password/:resetToken
```
---
## How To Use

### Run locally

### Clone the project

```html
git clone https://github.com/GiovannaK/Restaurant-Booking-server.git
```
### Assuming you already have NodeJS and npm installed and properly configured: Run the command below to install all required dependencies

```html
npm install
```
### Creating Environment variables. 

- create a .env file in the root folder

- Then add the following information and your credentials

```html
MONGO_URI = add your connection string here

PORT = choose a PORT to run the application

SENDGRID_API_KEY = add your sendgrid api key here

EMAIL_HOST_USER = add your email here to send emails to users

TOKEN_SECRET = your jwt token secret

TOKEN_EXPIRATION = choose expiration date for token

BASE_URL = Client URL

BACKEND_URL = API URL

AWS_ACCESS_KEY_ID = your aws access id

AWS_SECRET_ACCESS_KEY = your aws secret key

AWS_DEFAULT_REGION = your aws default region 

AWS_BUCKET_NAME = name of your aws bucket

STORAGE_TYPE = If you want host images on aws set to -> s3. Otherwise set to -> local

COOKIE_PASSWORD = generate a cookie password here
```

### DATABASE

#### If you want run a local MONGODB database

- Go to src/config/database.js and set your credentials here

### Finally run the project

```html
npm run dev
```
---

## License

MIT License

Copyright (c) [2020]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.



---

## Author Info

- Linkedin - [Giovanna Cunha](https://www.linkedin.com/in/giovanna-kelli/)
