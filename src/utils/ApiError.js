class ApiError extends Error {
    constructor(
        statusCode,
        message= "Something went wrong",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors

        if (stack) {
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.constructor)
        }

    }
}

export {ApiError}


// usage
//when you call api with invalid program or data then you get error so if you get 
// error then you have to send the eror in appropriate way or format
// so this error will be converted into ApiError class and send to client
//status code will be 400 because it is invalid request
// data will be null because there is no data to send
// message will be "Something went wrong" because there is no specific error message
// success will be false because it is an error

//stack is used to track where error is comming from it shows files in sequnece from where error is called
//stack trace is used to debug and understand error better
