# users

## signup

endpoint = '/signup'.
method = 'POST'.

    request_body = {
        "firstname" : "string",     [required]
        "lastname" : "string",      [required]
        "username" : "string",      [required]
        "password" : "string",      [required]
        "email" : "string", =>      [not required] can be added later
        "avatar" : "string" (url)   [not required] if not supplied it become "defaul:avatar"
        }

    response_onSuccess = {
    "message":"account created successfully",
    "token":"string" [user's access_token]
    }

    response_onValidationFail = {
    "nulls":[], => contains empty fields
    "invalid":[], => contains invalid inputs like email or password
    }


    response_onUsedUsernameFail ={
    "error": "some data you entered is invalid",
    "inputs": "string" [invalid input name]
    }

## login

endpoint = '/login'
method = 'POST'

request_body = {
"u": "string", [required] => could be eamil or username
"password" : "string", [required]
}

response_onSuccess = {
"token":"string" [user's access_token]
}

response_onValidationFail = {
"nulls":[], => contains empty fields
"invalid":[], => contains invalid inputs like email or password
}

response_onWrongData = {
"msg":'Wrong username or password'
}
[NOTE] : password should be minimum 8 chars 1 letter and 1 special char at least.

## auth with access token

endpoint = '/auth'
method = 'POST'

        request_body = {
         token:"access_token goes here"
        }

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

# products