# Hire Job Apps Back-End

project API to hire employe and get job 


## Run Locally

Clone the project

```bash
  git clone https://github.com/rizkysyp/hireapp-be
```

Go to the project directory

```bash
  cd hireapp-be
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file


`HOST=`

`PORT=`

`JWT_KEY=`

`PG_CONNECT=`

`PG_USER=`

  `PG_HOST=`

  `PG_DB=`

  `PG_PASS=`

  `PG_PORT=`


  `MAIL_USERNAME=`

  `MAIL_PASSWORD=`

  `OAUTH_CLIENTID=`

  `OAUTH_CLIENT_SECRET=`

  `OAUTH_REFRESH_TOKEN=`



  `PHOTO_CLOUD_NAME=`

  `PHOTO_KEY=`

  `PHOTO_SECRET=`



## API Reference - User

#### Register Employe

```http
  POST /users/register/employee
```
Field body form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. email |
| `password` | `string` | **Required**. password |
| `name` | `string` | **Required**. name |
| `phone` | `numbers` | **Required**. phone |

#### Register Company

```http
  POST /users/register/company
```
Field body form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. email |
| `password` | `string` | **Required**. password |
| `name` | `string` | **Required**. name |
| `phone` | `numbers` | **Required**. phone |
| `company_name` | `string` | **Required**. company_name |
| `position` | `string` | **Required**. position |

#### Login

```http
  POST /users/login
```
Field body form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. email |
| `password` | `string` | **Required**. password |

#### Get profile user

```http
  GET /users/profile
```
Field auth form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `bearer token` | `string` | **Required**. token from response login |

#### Get all employe

```http
  GET /users/employee/all
```
Field auth form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `bearer token` | `string` | **Required**. token from response login |

Field params form

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `search` | `string` | **Required**. search word |
| `sortBy` | `string` | **Required**. category of search |
| `sortOrder` | `string` | **Required**. ASC or DESC |
| `page` | `numbers` | **Required**. numbers of page |
| `limit` | `numbers` | **Required**. limit to display |


#### Get detail employe

```http
  GET /users/employee/:id
```
Field auth form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `bearer token` | `string` | **Required**. token from response login |

Field params form

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. id employee |

#### Edit Company profile

```http
  PUT /users/update-company
```
Field auth form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `bearer token` | `string` | **Required**. token from response login |

Field body form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `company_email` | `string` | **Required**. company_email |
| `province` | `string` | **Required**. province |
| `city` | `string` | **Required**. city |
| `companyphone` | `numbers` | **Required**. companyphone |
| `company_name` | `string` | **Required**. company_name |
| `linkedin` | `string` | **Required**. linkedin |
| `photo` | `file` | **Required**. photo |
| `position` | `string` | **Required**. position |

#### Edit Employe profile

```http
  PUT /users/update-employe
```
Field auth form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `bearer token` | `string` | **Required**. token from response login |

Field body form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `description` | `string` | **Required**. description |
| `province` | `string` | **Required**. province |
| `city` | `string` | **Required**. city |
| `job` | `string` | **Required**. job |
| `name` | `string` | **Required**. name |
| `workplace` | `string` | **Required**. workplace |

## API Reference - Skill

#### Input Skill

```http
  POST /skill/add
```
Field auth form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `bearer token` | `string` | **Required**. token from response login |

Field body form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `skill` | `string` | **Required**. skill |

#### Delete Skill

```http
  DELETE /skill/delete
```
Field auth form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `bearer token` | `string` | **Required**. token from response login |

Field body form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `skill` | `string` | **Required**. skill |

#### Get Skill

```http
  POST /skill/get
```
Field auth form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `bearer token` | `string` | **Required**. token from response login |

#### Get Skill id

```http
  POST /skill/:id
```
Field auth form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `bearer token` | `string` | **Required**. token from response login |

Field params form

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. id employee |

## API Reference - Portofolio

#### Input Portofolio

```http
  POST /portofolio/add
```
Field auth form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `bearer token` | `string` | **Required**. token from response login |

Field body form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. name |
| `repo` | `string` | **Required**. repo |
| `type` | `string` | **Required**. type |
| `photo` | `file` | **Required**. photo |

#### Edit Portofolio

```http
  PUT /portofolio/edit
```
Field auth form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `bearer token` | `string` | **Required**. token from response login |

Field body form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. name |
| `repo` | `string` | **Required**. repo |
| `type` | `string` | **Required**. type |
| `id_table` | `string` | **Required**. id_table |
| `photo` | `file` | **Required**. photo |

#### Delete Portofolio

```http
  DELETE /portofolio/delete
```
Field auth form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `bearer token` | `string` | **Required**. token from response login |

Field body form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id_table` | `string` | **Required**. id_table |

#### Get Portofolio

```http
  GET /portofolio/get
```
Field auth form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `bearer token` | `string` | **Required**. token from response login |

#### Get detail Portofolio

```http
  GET /portofolio/detail/:id
```

Field params form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id_table` | `string` | **Required**. id_table |

#### Get employe Portofolio

```http
  GET /portofolio/:id
```
Field auth form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `bearer token` | `string` | **Required**. token from response login |

Field params form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id_users` | `string` | **Required**. id employe |

## API Reference - Hiring

#### Hiring Employee

```http
  POST /hire/:id
```
Field auth form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `bearer token` | `string` | **Required**. token from response login |

Field body form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `position` | `string` | **Required**. position |
| `description` | `string` | **Required**. description |

Field params form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id_users` | `string` | **Required**. id employe |

#### Get Hiring Employee

```http
  GET /hire/list
```
Field auth form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `bearer token` | `string` | **Required**. token from response login |

#### Get Chat Employee

```http
  GET /chat/:id
```
Field auth form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `bearer token` | `string` | **Required**. token from response login |

Field params form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. hire_id |

#### chat Employee

```http
  POST /post-chat/:id
```
Field auth form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `bearer token` | `string` | **Required**. token from response login |

Field body form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `chat` | `string` | **Required**. chat |

Field params form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. hire_id |

## API Reference - Experience

#### Input Experience

```http
  POST /experience/
```
Field auth form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `bearer token` | `string` | **Required**. token from response login |

Field body form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `position` | `string` | **Required**. position |
| `work_start` | `string` | **Required**. work_start |
| `work_end` | `string` | **Required**. work_end |
| `description` | `string` | **Required**. description |
| `company_name` | `string` | **Required**. company_name |

#### Delete experience

```http
  DELETE /experience/:id
```
Field auth form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `bearer token` | `string` | **Required**. token from response login |

Field params form

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. id experience |

#### Get experience

```http
  GET /experience/
```
Field auth form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `bearer token` | `string` | **Required**. token from response login |

#### Get experience

```http
  GET /experience/:id
```
Field auth form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `bearer token` | `string` | **Required**. token from response login |

Field params form

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. id employee |

#### Get experience detail

```http
  GET /experience/:id
```
Field auth form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `bearer token` | `string` | **Required**. token from response login |

Field params form

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. id experience |

#### Edit Experience

```http
  PUT /experience/:id
```
Field auth form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `bearer token` | `string` | **Required**. token from response login |

Field body form
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `position` | `string` | **Required**. position |
| `work_start` | `string` | **Required**. work_start |
| `work_end` | `string` | **Required**. work_end |
| `description` | `string` | **Required**. description |
| `company_name` | `string` | **Required**. company_name |

Field params form

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. id experience |
