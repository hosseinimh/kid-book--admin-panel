# Admin panel for registering no-birth-certificate students as well as their parents or relatives

## Brief

This project is designed with `Laravel` as backend, `React.js` as frontend and `MySql` for storing data.

To register no-birth-certificate students in schools, they must have an official letter, which is written down their names and parents on it, every year. It`s good to have a database of such students and their family members. On the other hand, the number of these students are a lot and issuing an official letter for very of them is time wasting so I decided to create a website to automate some parts of this routine process.

## Installation

There are two main directories in the root: `project` and `public_html`.

All logics and Laravel core files are in `project` directory. `public_html` is responsible for representing the website, and all asset files such as images, js files and css are in it.

I created two files in the `project` directory which specify the environment and paths to main directories:
`server-config.json`, `server-config.php`. If you deploy the project on a subdomain, you can simply change the public_path in both files and we are all set.

### server-config.json

```bash
{
    "relativePublicPath": "./../public_html",
    "appEnv": "local" // or "production"
}
```

### server-config.php

```bash
define('PUBLIC_PATH', __DIR__ . '/../public_html');
define('FRAMEWORK_PATH', __DIR__);
```

### Database configuration

Also, you have to set the database connection parameters in `.env`:

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=non_certificates_db
DB_USERNAME=root
DB_PASSWORD=123456
```

### Tables migrations and fake data initialization

Go to the `project` directory and run this custom command:

```bash
php artisan project:init
```

This command creates 100 students, which every student has 7 relatives (Father, mother, brother, sister, grandfather, grandmother and other).

It also creates a user to login:

````bash
user: 991061
password: 1234

## Database seeding
The project has three main models: `User`, `Student` and `Relative`. Since every student has a few relatives, `Relative` is a sub-model of `Student`, so I created `StudentSeeder` to initialize both students and relatives tables with fake data:
```bash
public function run()
{
    $date = '1401/01/01';
    $timestamp = Helper::getTimestamp($date);
    $data = ['birth_date' => $date, 'birth_date_timestamp' => $timestamp];

    Student::factory(100)->create($data)->each(function ($student) use ($data) {
        foreach (range(1, 7) as $number) {
            Relative::factory()->create(
                array_merge([
                    'student_id' => $student->id,
                    'relation' => $number,
                    'relation_text' => $number === 7 ? __('relative.relation_7') : null,
                ], $data)
            );
        }
    });
}
````

The function creates 100 students and for each of them creates 7 relatives with defferent type of relation. `$data` parameter overwrites on default array in model factory.

## Deployment

To start the project on the server, just open your website:

```bash
  GET /
```

Or go to the `project` directory and run `artisan serve` command on localhost:

```bash
  php artisan serve
```

As mentioned before, default credentials are:

**username:** 991061

**password:** 1234

### Initialization

If you're on a server, go to `/initialize`:

```bash
  GET /initialize
```

If you're on localhost, you have two options to initialize the project:

-   Go to `/initialize`

```bash
  GET /initialize
```

-   Or simply run a custom artisan console command, `project:init`:

```bash
php artisan project:init
```

If everything goes well, the output will be like this:

```bash
Initializing the project with fake data ...

Cache was cleared successfully.
Old uploaded files were deleted successfully.
Symbolic links were created successfully.
Creating tables and seeding data ...
Database tables were created successfully.
1 user was created successfully.
100 students were created successfully.
700 relatives were created successfully.

****
Username: 991061
Password: 1234
****

READY TO GO!
```

If you don't want to reset your database data and initialize the project anymore, just remove this line in `routes/web.php`:

```bash
  Route::get('initialize', [Controller::class, 'initialize']);
```

## API Reference

### Resources

#### Login user

```bash
POST /api/users/login
```

| Parameter  | Type     | Description                             |
| :--------- | :------- | :-------------------------------------- |
| `username` | `string` | **Required**. Username of user to login |
| `password` | `string` | **Required**. Password of user to login |

Logins a user with `username` and `password` and returns the auth user if credentials are valid.

#### Get users

Returns list of users.

```bash
POST /api/users
```

| Parameter | Type      | Description                                       |
| :-------- | :-------- | :------------------------------------------------ |
| `email`   | `string`  | **Optional**. Email of students to search         |
| `name`    | `string`  | **Optional**. Name / family of students to search |
| `_pn`     | `integer` | **Optional**. Page number of list to show         |
| `_pi`     | `integer` | **Optional**. Items per page                      |

#### Get user

Returns a specific user.

```bash
POST /api/users/show/{user}
```

| Parameter | Type      | Description                       |
| :-------- | :-------- | :-------------------------------- |
| `user`    | `integer` | **Required**. Id of user to fetch |

#### Update user

Updates a specific user.

```bash
POST /api/users/update/{user}
```

| Parameter | Type      | Description                        |
| :-------- | :-------- | :--------------------------------- |
| `user`    | `integer` | **Required**. Id of user to update |

#### Change password of user

Changes password of a specific user.

```bash
POST /api/users/change_password/{user}
```

| Parameter | Type      | Description                                 |
| :-------- | :-------- | :------------------------------------------ |
| `user`    | `integer` | **Required**. Id of user to change password |

#### Get student

Returns a specific student.

```bash
POST /api/students/show/{student}
```

| Parameter | Type      | Description                          |
| :-------- | :-------- | :----------------------------------- |
| `student` | `integer` | **Required**. Id of student to fetch |

#### Get students

Returns list of students.

```bash
POST /api/students
```

| Parameter | Type      | Description                               |
| :-------- | :-------- | :---------------------------------------- |
| `name`    | `string`  | **Optional**. Name of students to search  |
| `_pn`     | `integer` | **Optional**. Page number of list to show |
| `_pi`     | `integer` | **Optional**. Items per page              |

## Documentation

### Architecture

As Laravel is based on MVC, I use another layer called `Service`, which is responsible for all logic operations, so `Controller` layer is just for receiving inputs and representing outputs.

I also use separate classes for validating requests and send them as request inputs to controllers. These classes throw exceptions on invalid input fields, and in `render` function in `Handler` class, it will be catched and based on error, shows the appropriate response.

The project uses `API Resources` as `Repositories` to standardize responses.
It also utilizes Laravel ORM, `Eloquent`, for readability and integration.

#### Database

The project uses `MySQL` which is an open-source relational database management system.

#### sanctum

As API calls are stateless, sessions can't be used to identify users.
I use `sanctum` to authenticate and authorize users.
On the backend, I use `middlewares` to handle users accessing endpoint routes.

#### Application state container

Redux is an open-source JavaScript library for managing and centralizing application state. Redux is used for notifications, the current user properties, the current page the user is in, and so on.

#### UI

The project utilizes [coreui](https://coreui.io/) which is a free Bootstrap Admin Dashboard Template, and I made some changes to it.

For frontend validation, the project uses Yup which is a schema builder for runtime value parsing and validation.

### Programming languages

-   PHP 8.0.2
-   Laravel framework 9.19
-   React 18.2.0

### Technologies & features

-   MVC architecture
-   Service layer
-   Repository pattern
-   Middleware
-   Service container binding
-   Dependency injection
-   Route model binding
-   Migration
-   Database seeding
-   Model factory
-   sanctum
-   Artisan CLI
-   Custom console command
-   Custom request validator
-   Storage
-   Symbolic links
-   Exception handling
-   Error logging
-   Localization
-   Redux
-   React Router
-   Axios
-   Yup
-   Local storage
-   Bootstrap

## Authors

-   [@hosseinimh](https://www.github.com/hosseinimh)

API Resource was designed, implemented, documented, and maintained by Mahmoud Hosseini, a Full Stack developer.

-   Email: hosseinimh@gmail.com

-   Twitter: [@hosseinimh](https://twitter.com/hosseinimh)

## Badges

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)

## 🔗 Links

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://hosseinimh.com/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mahmoud-hosseini-553324217)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/hosseinimh)

## 🚀 About Me

**Mahmoud Hosseini**

![Logo](https://avatars.githubusercontent.com/u/10962058?s=400&u=6b87ec621c17fcd26ec6c9364100b30f73bffb49&v=4)

I'm a Full Stack developer coding Php Laravel, React.JS, C#, ...

Learning programming for more than 18 years.

## 🛠 Skills

Javascript, HTML, CSS, Sass, Bootstrap, Material UI, React.JS, React native, PHP Laravel, PHP Codeigniter, WordPress, ...
