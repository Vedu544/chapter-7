class ApiResponse {
    constructor
    (statusCode,
     data,
     message = "Success")

    {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

export { ApiResponse }


// when you want to send api response you have to send statuscode, data, message
// basically statuscode < 400 means success otherwise failure
// data is actual data which you want to send to client
// message is a string which you want to send to client
//