# store api docs

## [auth](#auth)

- [signup](#signup)

- [login](#login)

- [auth](#auth-with-access-token)

- [logout](#logout)

## [users](#users)

- [get by id](#getbyid)

- [update user data](#update-user-data)

- [update user password](#update-user-password)




---




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




---




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
