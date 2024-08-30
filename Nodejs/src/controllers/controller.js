import service from '../services/service'

let apiPaymentMomo = async(req, res) => {
    //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
    //parameters
    var accessKey = "F8BBA842ECF85";
    var secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
    var orderInfo = "pay with MoMo";
    var partnerCode = "MOMO";
    var redirectUrl =
      "exp://192.168.1.15:8081";
    var ipnUrl = "exp://192.168.1.15:8081";
    var requestType = "payWithMethod";
    var amount = req.body.amount;
    var orderId = partnerCode + new Date().getTime();
    var requestId = orderId;
    var extraData = "";
    var orderGroupId = "";
    var autoCapture = true;
    var lang = "vi";

    //before sign HMAC SHA256 with format
    //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    var rawSignature =
      "accessKey=" +
      accessKey +
      "&amount=" +
      amount +
      "&extraData=" +
      extraData +
      "&ipnUrl=" +
      ipnUrl +
      "&orderId=" +
      orderId +
      "&orderInfo=" +
      orderInfo +
      "&partnerCode=" +
      partnerCode +
      "&redirectUrl=" +
      redirectUrl +
      "&requestId=" +
      requestId +
      "&requestType=" +
      requestType;
    //puts raw signature
    console.log("--------------------RAW SIGNATURE----------------");
    console.log(rawSignature);
    //signature
    const crypto = require("crypto");
    var signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");
    console.log("--------------------SIGNATURE----------------");
    console.log(signature);

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      partnerName: "Test",
      storeId: "MomoTestStore",
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      lang: lang,
      requestType: requestType,
      autoCapture: autoCapture,
      extraData: extraData,
      orderGroupId: orderGroupId,
      signature: signature,
    });
    //Create the HTTPS objects
    const https = require("https");
    const options = {
      hostname: "test-payment.momo.vn",
      port: 443,
      path: "/v2/gateway/api/create",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(requestBody),
      },
    };
    //Send the request and get the response
    const reqq = https.request(options, (ress) => {
      console.log(`Status: ${res.statusCode}`);
      console.log(`Headers: ${JSON.stringify(ress.headers)}`);
      ress.setEncoding("utf8");
      ress.on("data", (body) => {
        console.log("Body: ");
        console.log(body);
        console.log("resultCode: ");
        console.log(JSON.parse(body).resultCode);
        return res.status(200).json(body)
      });
      ress.on("end", () => {
        console.log("No more data in response.");
      });
    });

    reqq.on("error", (e) => {
      console.log(`problem with request: ${e.message}`);
    });
    // write data to request body
    console.log("Sending....");
    reqq.write(requestBody);
    reqq.end();
}

// API POST
let apiPostInsertAccount = async(req, res) => {
    let data = await service.apiPostInsertAccount(req.body)
    return res.status(200).json(data);
}

let apiPostInsertUser = async(req, res) => {
    let data = await service.apiPostInsertUser(req.body)
    return res.status(200).json(data);
}

let apiPostInsertMovie = async(req, res) => {
    let data = await service.apiPostInsertMovie(req.body)
    return res.status(200).json(data);
}

let apiPostInsertCinema = async(req, res) => {
    let data = await service.apiPostInsertCinema(req.body)
    return res.status(200).json(data);
}

let apiPostInsertMovieDate = async(req, res) => {
    let data = await service.apiPostInsertMovieDate(req.body)
    return res.status(200).json(data);
}

let apiPostInsertShowTime = async(req, res) => {
    let data = await service.apiPostInsertShowTime(req.body)
    return res.status(200).json(data);
}

let apiPostInsertTicket = async(req, res) => {
    let data = await service.apiPostInsertTicket(req.body)
    return res.status(200).json(data);
}

let apiPostInsertCombo = async(req, res) => {
    let data = await service.apiPostInsertCombo(req.body)
    return res.status(200).json(data);
}

let apiPostInsertFare = async(req, res) => {
    let data = await service.apiPostInsertFare(req.body)
    return res.status(200).json(data);
}

// API GET
let apiGetListCinema = async(req, res) => {
    let cinemas = await service.apiGetListCinema()
    return res.status(200).json({
        cinemas : cinemas
    })
}

let apiGetListMovie = async(req, res) => {
    let movies = await service.apiGetListMovie()
    return res.status(200).json({
        movies : movies
    })
}

let apiGetAllMovie = async(req, res) => {
    let movies = await service.apiGetAllMovie()
    return res.status(200).json({
        movies : movies
    })
}

let apiGetAllShowTimeByMovieDateID = async(req, res) => {
    let showTimes = await service.apiGetAllShowTimeByMovieDateID(req.body.id)
    return res.status(200).json({
        showTimes : showTimes
    })
}

let apiGetSeatsChosen = async(req, res) => {
    let seats = await service.apiGetSeatsChosen()
    return res.status(200).json({
        seats : seats
    })
}

let apiGetCombos = async(req, res) => {
    let combos = await service.apiGetCombos()
    return res.status(200).json({
        combos : combos
    })
}

let apiGetUserID = async(req, res) => {
    let userID = await service.apiGetUserID()
    return res.status(200).json({
        userID : userID
    })
}

let apiGetAccountID = async(req, res) => {
    let accountID = await service.apiGetAccountID()
    return res.status(200).json({
        accountID : accountID
    })
}

let apiGetMovieID = async(req, res) => {
    let movieID = await service.apiGetMovieID()
    return res.status(200).json({
        movieID : movieID
    })
}

let apiGetCinemaID = async(req, res) => {
    let cinemaID = await service.apiGetCinemaID()
    return res.status(200).json({
        cinemaID : cinemaID
    })
}

let apiGetMovieDateID = async(req, res) => {
    let movieDateID = await service.apiGetMovieDateID()
    return res.status(200).json({
        movieDateID : movieDateID
    })
}

let apiGetTicketID = async(req, res) => {
    let ticketID = await service.apiGetTicketID()
    return res.status(200).json({
        ticketID : ticketID
    })
}

let apiGetComboID = async(req, res) => {
    let comboID = await service.apiGetComboID()
    return res.status(200).json({
        comboID : comboID
    })
}

let apiGetFareID = async(req, res) => {
    let fareID = await service.apiGetFareID()
    return res.status(200).json({
        fareID : fareID
    })
}

let apiGetUserByPage = async(req, res) => {
    let users = await service.apiGetUserByPage(req.body)
    return res.status(200).json({
        users : users
    })
}

let apiGetMovieByPage = async(req, res) => {
    let movies = await service.apiGetMovieByPage(req.body)
    return res.status(200).json({
        movies : movies
    })
}

let apiGetCinemaByPage = async(req, res) => {
    let cinemas = await service.apiGetCinemaByPage(req.body)
    return res.status(200).json({
        cinemas : cinemas
    })
}

let apiGetMovieDateByPage = async(req, res) => {
    let movieDates = await service.apiGetMovieDateByPage(req.body)
    return res.status(200).json({
        movieDates : movieDates
    })
}

let apiGetTicketByPage = async(req, res) => {
    let tickets = await service.apiGetTicketByPage(req.body)
    return res.status(200).json({
        tickets : tickets
    })
}

let apiGetComboByPage = async(req, res) => {
    let combos = await service.apiGetComboByPage(req.body)
    return res.status(200).json({
        combos : combos
    })
}

let apiGetFareByPage = async(req, res) => {
    let fares = await service.apiGetFareByPage(req.body)
    return res.status(200).json({
        fares : fares
    })
}

let apiGetUserByID = async(req, res) => {
    let user = await service.apiGetUserByID(req.body.id)
    return res.status(200).json({
        user : user
    })
}

let apiGetAccountByUserID = async(req, res) => {
    let account = await service.apiGetAccountByUserID(req.body.id)
    return res.status(200).json({
        account : account
    })
}

let apiCheckAccountByEmailPassword = async(req, res) => {
    let user = await service.apiCheckAccountByEmailPassword(req.body.email, req.body.password)
    return res.status(200).json({
        user : user
    })
}

let apiGetMovieByID = async(req, res) => {
    let movie = await service.apiGetMovieByID(req.body.id)
    return res.status(200).json({
        movie : movie
    })
}

let apiGetCinemaByID = async(req, res) => {
    let cinema = await service.apiGetCinemaByID(req.body.id)
    return res.status(200).json({
        cinema : cinema
    })
}

let apiGetMovieDateByID = async(req, res) => {
    let movieDate = await service.apiGetMovieDateByID(req.body.id)
    return res.status(200).json({
        movieDate : movieDate
    })
}

let apiGetShowTimeByID = async(req, res) => {
    let showTime = await service.apiGetShowTimeByID(req.body.id)
    return res.status(200).json({
        showTime : showTime
    })
}

let apiGetTicketByID = async(req, res) => {
    let ticket = await service.apiGetTicketByID(req.body.id)
    return res.status(200).json({
        ticket : ticket
    })
}

let apiGetComboByID = async(req, res) => {
    let combo = await service.apiGetComboByID(req.body.id)
    return res.status(200).json({
        combo : combo
    })
}

let apiGetFareByID = async(req, res) => {
    let fare = await service.apiGetFareByID(req.body.id)
    return res.status(200).json({
        fare : fare
    })
}

let apiGetQuantityUser = async(req, res) => {
    let arrayQuantity = await service.apiGetQuantityUser(req.body)
    return res.status(200).json({
        arrayQuantity : arrayQuantity
    })
}

let apiGetQuantityMovie = async(req, res) => {
    let arrayQuantity = await service.apiGetQuantityMovie(req.body)
    return res.status(200).json({
        arrayQuantity : arrayQuantity
    })
}

let apiGetQuantityCinema = async(req, res) => {
    let arrayQuantity = await service.apiGetQuantityCinema(req.body)
    return res.status(200).json({
        arrayQuantity : arrayQuantity
    })
}

let apiGetQuantityMovieDate = async(req, res) => {
    let arrayQuantity = await service.apiGetQuantityMovieDate(req.body)
    return res.status(200).json({
        arrayQuantity : arrayQuantity
    })
}

let apiGetQuantityTicket = async(req, res) => {
    let arrayQuantity = await service.apiGetQuantityTicket(req.body)
    return res.status(200).json({
        arrayQuantity : arrayQuantity
    })
}

let apiGetQuantityCombo = async(req, res) => {
    let arrayQuantity = await service.apiGetQuantityCombo(req.body)
    return res.status(200).json({
        arrayQuantity : arrayQuantity
    })
}

let apiGetQuantityFare = async(req, res) => {
    let arrayQuantity = await service.apiGetQuantityFare(req.body)
    return res.status(200).json({
        arrayQuantity : arrayQuantity
    })
}

let apiGetUserBySearch = async(req, res) => {
    let users = await service.apiGetUserBySearch(req.body.columnSearch, req.body.value)
    return res.status(200).json({
        users : users
    })
}

let apiGetListMovieByCinemaID = async(req, res) => {
    let movies = await service.apiGetListMovieByCinemaID(req.body.id)
    return res.status(200).json({
        movies : movies
    })
}

let apiGetListMovieDateByCinemaIDAndMovieID = async(req, res) => {
    let movieDates = await service.apiGetListMovieDateByCinemaIDAndMovieID(req.body.cinemaID,req.body.movieID)
    return res.status(200).json({
        movieDates : movieDates
    })
}

let apiGetDetailInfoTicket = async(req, res) => {
    let ticket = await service.apiGetDetailInfoTicket(req.body.id)
    return res.status(200).json({
        ticket : ticket
    })
}

let apiGetShowTimeMovie = async(req, res) => {
    let movie = await service.apiGetShowTimeMovie(req.body.id)
    return res.status(200).json({
        movie : movie
    })
}

let apiGetPricesOfFare = async(req, res) => {
    let price = await service.apiGetPricesOfFare(req.body)
    return res.status(200).json({
        price : price
    })
}

let apiGetSeatsOrdered = async(req, res) => {
    let seatsOrdered = await service.apiGetSeatsOrdered(req.body)
    return res.status(200).json({
        seatsOrdered : seatsOrdered
    })
}

let apiGetTicketOrderedByUserID = async(req, res) => {
    let ticketOrdered = await service.apiGetTicketOrderedByUserID(req.body.id)
    return res.status(200).json({
        ticketOrdered : ticketOrdered
    })
}
//API PUT
let apiPutUpdateUser = async(req, res) => {
    let data = await service.apiPutUpdateUser(req.body)
    return res.status(200).json(data);
}

let apiPutUpdateAccount = async(req, res) => {
    let data = await service.apiPutUpdateAccount(req.body)
    return res.status(200).json(data);
}

let apiPutUpdateMovie = async(req, res) => {
    let data = await service.apiPutUpdateMovie(req.body)
    return res.status(200).json(data);
}

let apiPutUpdateCinema = async(req, res) => {
    let data = await service.apiPutUpdateCinema(req.body)
    return res.status(200).json(data);
}

let apiPutUpdateMovieDate = async(req, res) => {
    let data = await service.apiPutUpdateMovieDate(req.body)
    return res.status(200).json(data);
}

let apiPutUpdateShowTime = async(req, res) => {
    let data = await service.apiPutUpdateShowTime(req.body)
    return res.status(200).json(data);
}

let apiPutUpdateContentFilmMovie = async(req, res) => {
    let data = await service.apiPutUpdateContentFilmMovie(req.body.id, req.body.contentFilm)
    return res.status(200).json(data);
}

let apiPutUpdateTicket = async(req, res) => {
    let data = await service.apiPutUpdateTicket(req.body)
    return res.status(200).json(data);
}

let apiPutUpdateCombo = async(req, res) => {
    let data = await service.apiPutUpdateCombo(req.body)
    return res.status(200).json(data);
}

let apiPutUpdateFare = async(req, res) => {
    let data = await service.apiPutUpdateFare(req.body)
    return res.status(200).json(data);
}

// API DELETE
let apiDeleteUserByID = async(req, res) => {
    let resultDelete = await service.apiDeleteUserByID(req.body.id)
    return res.status(200).json(resultDelete);
}

let apiDeleteMovieByID = async(req, res) => {
    let resultDelete = await service.apiDeleteMovieByID(req.body.id)
    return res.status(200).json(resultDelete);
}

let apiDeleteCinemaByID = async(req, res) => {
    let resultDelete = await service.apiDeleteCinemaByID(req.body.id)
    return res.status(200).json(resultDelete);
}

let apiDeleteMovieDateByID = async(req, res) => {
    let resultDelete = await service.apiDeleteMovieDateByID(req.body.id)
    return res.status(200).json(resultDelete);
}

let apiDeleteShowTimeByID = async(req, res) => {
    let resultDelete = await service.apiDeleteShowTimeByID(req.body.id)
    return res.status(200).json(resultDelete);
}

let apiDeleteTicketByID = async(req, res) => {
    let resultDelete = await service.apiDeleteTicketByID(req.body.id)
    return res.status(200).json(resultDelete);
}

let apiDeleteComboByID = async(req, res) => {
    let resultDelete = await service.apiDeleteComboByID(req.body.id)
    return res.status(200).json(resultDelete);
}

let apiDeleteFareByID = async(req, res) => {
    let resultDelete = await service.apiDeleteFareByID(req.body.id)
    return res.status(200).json(resultDelete);
}

module.exports = {
    apiPaymentMomo,

    // API POST
    apiPostInsertUser,
    apiPostInsertMovie,
    apiPostInsertCinema,
    apiPostInsertMovieDate,
    apiPostInsertShowTime,
    apiPostInsertTicket,
    apiPostInsertCombo,
    apiPostInsertFare,
    apiPostInsertAccount,
    //API GET
    apiGetListCinema,
    apiGetAllMovie,
    apiGetListMovie,
    apiGetAllShowTimeByMovieDateID,
    apiGetSeatsChosen,
    apiGetCombos,
    apiGetUserID,
    apiGetAccountID,
    apiGetMovieID,
    apiGetCinemaID,
    apiGetMovieDateID,
    apiGetTicketID,
    apiGetComboID,
    apiGetFareID,
    apiGetUserByPage,
    apiGetMovieByPage,
    apiGetCinemaByPage,
    apiGetMovieDateByPage,
    apiGetTicketByPage,
    apiGetComboByPage,
    apiGetFareByPage,
    apiGetUserByID,
    apiGetMovieByID,
    apiGetCinemaByID,
    apiGetMovieDateByID,
    apiGetShowTimeByID,
    apiGetTicketByID,
    apiGetComboByID,
    apiGetFareByID,
    apiGetQuantityUser,
    apiGetQuantityMovie,
    apiGetQuantityCinema,
    apiGetQuantityMovieDate,
    apiGetQuantityTicket,
    apiGetQuantityCombo,
    apiGetQuantityFare,
    apiGetUserBySearch,
    apiGetListMovieByCinemaID,
    apiGetListMovieDateByCinemaIDAndMovieID,
    apiGetDetailInfoTicket,
    apiGetShowTimeMovie,
    apiGetPricesOfFare,
    apiCheckAccountByEmailPassword,
    apiGetAccountByUserID,
    apiGetSeatsOrdered,
    apiGetTicketOrderedByUserID,
    // API PUT
    apiPutUpdateUser,
    apiPutUpdateMovie,
    apiPutUpdateCinema,
    apiPutUpdateMovieDate,
    apiPutUpdateShowTime,
    apiPutUpdateContentFilmMovie,
    apiPutUpdateTicket,
    apiPutUpdateCombo,
    apiPutUpdateFare,
    apiPutUpdateAccount,
    // API DELETE
    apiDeleteUserByID,
    apiDeleteMovieByID,
    apiDeleteCinemaByID,
    apiDeleteMovieDateByID,
    apiDeleteShowTimeByID,
    apiDeleteTicketByID,
    apiDeleteComboByID,
    apiDeleteFareByID,
}