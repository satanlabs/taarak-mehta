
"use strict";
const fs = require('fs');
const fetch = require("node-fetch");

let all_in_one  = [];
let done = 0 ;
//170
for(var i = 0 ; i < 170 ; i ++){
    const var_i = i ;
    let requestPayload = {
        "detailsType": "basic",
        "searchSet": [
            {
                "pageSize": 15,
                "pageNumber": i,
                "sortOrder": "DISPLAY_NAME:ASC",
                "data": "rails=recommendation&item_id=5221755640001&rail_id=rec5e82e3b870e3763a79f455e&template=landscape&page_id=listing",
                "type": "recosense",
                "id": "reco_asset_based_default",
                "itemsUsed": 15,
                "language": "",
                "languageCode": "en_US"
            }
        ],
        "deviceDetails": {
            "mfg": "WEB",
            "os": "ios",
            "osVer": "XXX",
            "model": "WEB",
            "deviceId": "cb04142b-644b-46e0-afa2-f1609a81a451",
            "platform": "web"
        },
        "isSearchable": true
    };

    fetch("https://www.sonyliv.com/api/v4/vod/search", 
        {
        "headers": {
            "content-type": "application/json;charset=UTF-8"
        },
        "body": JSON.stringify(requestPayload),
        "method": "POST"
        }).then((res) => {return res.json(); })
        .then(
            (result) => {
                console.log("FETCH : result : i : "  , var_i);
                all_in_one.push(...result[0].assets);
                done++;
                if(done === 169 ){
                    /* ================== WRITE - synchronously (blocking) ==================== */
                fs.writeFileSync(`./data_tmkoc/item_all.json`, JSON.stringify(all_in_one) );
                }
            },
            (error) => {
                console.log("FETCH : error :", error);
            }
        );

}

