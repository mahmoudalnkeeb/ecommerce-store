# store api docs

### [auth](#auth-1)

- [signup](#signup)

- [login](#login)

- [auth](#auth-with-access-token)

- [logout](#logout)

### [users](#users-1)

- [get by id](#getbyid)

- [update user data](#update-user-data)

- [update user password](#update-user-password)

### [categories](#categories-1)

- [get all categories](#get-all-categories)

- [get category by name](#get-category-by-name)

### [products](#products-1)

- [get all products](#get-products)

- [get specific product](#get-specific-product-product-page)

### [misc](#misc-1)

- [validation](#username-validation--email-validation)

- [upload](#upload)

<br>
<br>
<br>

## auth

### signup

        fetch('/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstname: 'string', //   [required]
            lastname: 'string',  //   [required]
            username: 'string',  //   [required]
            password: 'string',  //   [required]
            email: 'string',     //   [not required] can be added later
            avatar: 'string',    //   [not required] if not supplied it become "default:avatar"
          }),
        }).then(
          (res) => console.log(res),
          (rej) => console.log(rej)
        );


        response_onSuccess = {
          "message":"account created successfully",
          "token":"string" [user's access_token]
        }

        response_onValidationFail = {
          "nulls":[], // contains empty fields
          "invalid":[], // contains invalid inputs like email or password
        }


        response_onUsedUsernameFail ={
          "error": "some data you entered is invalid",
          "inputs": "string" [invalid input name]
        }

### login

        fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            u: 'string', //[required] => could be eamil or username
            password: 'string', //[required]
          }),
        }).then(
          (res) => console.log(res),
          (rej) => console.log(rej)
        );


        response_onSuccess = {
          token: 'string', //[user's access_token]
        };


        response_onValidationFail = {
          nulls: [], // contains empty fields
          invalid: [], // contains invalid inputs like email or password
        };

        response_onWrongData = {
          "msg":'Wrong username or password'
        }

[NOTE] : password should be minimum 8 chars 1 letter and 1 special char at least.

### auth with access token

        fetch('/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token:"access_token goes here"
          }),
        }).then(
          (res) => console.log(res),
          (rej) => console.log(rej)
        );

        response_onSuccess = {
          "isAuth":true,
          "user" :{
             "user_id": 1, [user_id]
             "iat": 1660569878, [iniated at for token]
             "exp": 1660656278 [token expiry date]
            }
        }

        response_onFail = {
          "isAuth":false,
        }

### logout

        fetch('/logout' , {
          method:"PUT",
          headers:{
            "Content-Type":'application/json',
            "authorization":"access_token goes here"
          }
        })

<br>

<br>

## users

### getById

#### require authorization

        fetch('/user/:id' , {
          headers:{
            "authorization":"access_token goes here"
          }
        }).then(
          (res) => console.log(res),
          (rej) => console.log(rej)
        );



        response = {
          "user_id":"user unique id" ,
          "firstname":"user firstname" ,
          "lastname" : 'user lastname',
          "username" : 'username',
          "email" : 'user email',
          "avatar":'user image/avatar url' ,
          "created_at": 'date of user signup'
        }

### update user data

#### require authorization

        fetch('/user' , {
          method:"PUT"
          headers:{
            "authorization":"access_token goes here"
          },

          // only updates supplied data in body
          body:JSON.stringify({
            firstname : "new data", // [NOT REQUIRED]
            lastname : "new data", // [NOT REQUIRED]
            username : "new data", // [NOT REQUIRED]
            email : "new data", // [NOT REQUIRED]
            avatar : "new data", // [NOT REQUIRED]
          })
        }).then(
          (res) => console.log(res),
          (rej) => console.log(rej)
        );

    response = {firstname , lastname , username , email , avatar}

### update user password

#### require authorization

        fetch('/user/password' , {
          method:"PUT"
          headers:{
            "authorization":"access_token goes here"
          },

          body:JSON.stringify({
            newPass, // [REQUIRED]
            oldPass, // [REQUIRED]
          })
        }).then(
          (res) => console.log(res),
          (rej) => console.log(rej)
        );

      response = {access_token: new access token }

### delete user account

#### require authorization

        fetch('/user/password' , {
          method:"DELETE"
          headers:{
            "authorization":"access_token goes here"
          }
        )

<br>

<br>

## categories

### get all categories

        fetch('/categories')

        response = categories array

          [{
            cat_id:'',
            cat_name:'',
            cat_image:'',
            cat_desc:''
          }]

### get category by name

  **NOT WORKING**

<br>

<br>

## products

### get products

      fetch('/products/f')

      query string:

     [1] sort = 'recent' || 'oldest' || 'oldest' || 'lowest_price'

     [2] page = 1 => the number of page

      response = array of 20 product

## get specific product [product page]

    fetch('/products/:productId')

    parameters:

    productId = product unique id

    response = product object

      {
        productId,
        productName,
        productPrice,
        productDesc,
        productImages,
        productCategory,
      }

<br>

<br>

## misc

### username validation & email validation

    username => fetch('/user/check-username/:username')

    email => fetch('/user/check-email/:email')

    response => {available : boolean}

### upload

    use multipart/formdata to send post request

    '/upload'

    method : POST

    request body

    {
      asset : file(image)
    }

    asset can be any kind of images image/jpeg , image/png etc..  it will be uploaded and respond with url
