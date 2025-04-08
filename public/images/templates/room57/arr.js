var arr = [
    //"--------------------ROOM_1--------------------"
    {name: "left_board", width: "1149", height: "83", left: "-29", top: "0", visible: true, visibleStatus: true, roomNum: '1', buttonMode: false},
    
    {name: "right_board", width: "1149", height: "83", left: "1862", top: "0", visible: true, visibleStatus: true, roomNum: '1', buttonMode: false},
    
    {name: "table", width: "811", height: "448", left: "-125", top: "683", visible: true, visibleStatus: true, roomNum: '1', buttonMode: false},

    {name: "shelf", width: "352", height: "161", left: "735", top: "41", visible: true, visibleStatus: true, roomNum: '1', buttonMode: false},
    
    {name: "door", width: "299", height: "612", left: "196", top: "265", visible: true, visibleStatus: true, roomNum: '1', buttonMode: true, info: {ru: "Дверь заперта."}},
    
    {name: "letter", width: "44", height: "44", left: "311", top: "690", visible: true, visibleStatus: true, roomNum: '1', buttonMode: true, info: {ru: "Письмо."}},
    
    {name: "left_floor", width: "986", height: "277", left: "-34", top: "830", visible: true, visibleStatus: true, roomNum: '1', buttonMode: false},
    
    {name: "right_floor", width: "1098", height: "278", left: "950", top: "830", visible: true, visibleStatus: true, roomNum: '1', buttonMode: false},
    
    {name: "carpet", width: "851", height: "345", left: "605", top: "891", visible: true, visibleStatus: true, roomNum: '1', buttonMode: false},
    
    {name: "mouse", width: "109", height: "56", left: "764", top: "1023", visible: true, visibleStatus: true, roomNum: '1', buttonMode: true, info: {ru: "Кажется, это его не впечатляет.."}},

    {name: "tangle", width: "52", height: "51", left: "943", top: "975", visible: true, visibleStatus: true, roomNum: '1', buttonMode: true, info: {ru: "Кажется, это его не впечатляет.."}},
    
    {name: "cat_food", width: "51", height: "48", left: "1026", top: "1001", visible: true, visibleStatus: true, roomNum: '1', buttonMode: true, info: {ru: "То, что нужно."}},
    
    {name: "fireplace", width: "543", height: "357", left: "629", top: "520", visible: true, visibleStatus: true, roomNum: '1', buttonMode: false},
    
    {name: "box", width: "220", height: "162", left: "1235", top: "789", visible: true, visibleStatus: true, roomNum: '1', buttonMode: true, info: {ru: "Коробка."}},
    
    {name: "cat", width: "203", height: "151", left: "1248", top: "761", visible: true, visibleStatus: true, roomNum: '1', buttonMode: true, info: {ru: "Нужно попробовать его разбудить.."}},
    
    {name: "letter2", width: "64", height: "51", left: "1339", top: "903", visible: true, visibleStatus: true, roomNum: '1', buttonMode: true, info: {ru: "Кот крепко спит и сжимает письмо. Нужно чем-то его привлечь."}},
    
    {name: "window", width: "472", height: "451", left: "1222", top: "158", visible: true, visibleStatus: true, roomNum: '1', buttonMode: false},
    
    {name: "clock", width: "83", height: "102", left: "1332", top: "473", visible: true, visibleStatus: true, roomNum: '1', buttonMode: true, info: {ru: "Просто часы."}},
    
    {name: "christmas_tree", width: "626", height: "820", left: "1389", top: "250", visible: true, visibleStatus: true, roomNum: '1', buttonMode: false},
    
    {name: "wreath", width: "253", height: "236", left: "781", top: "248", visible: false, visibleStatus: false, roomNum: '1', buttonMode: false},
    
    {name: "first_pink_candle", width: "26", height: "71", left: "733", top: "454", visible: false, visibleStatus: false, roomNum: '1', buttonMode: true, info: {ru: "Свечам самое место на камине"}},
    
    {name: "first_green_candle", width: "34", height: "46", left: "766", top: "480", visible: false, visibleStatus: false, roomNum: '1', buttonMode: true, info: {ru: "Свечам самое место на камине"}},
    
    {name: "second_pink_candle", width: "26", height: "71", left: "1019", top: "456", visible: false, visibleStatus: false, roomNum: '1', buttonMode: true, info: {ru: "Свечам самое место на камине"}},
    
    {name: "second_green_candle", width: "34", height: "46", left: "1051", top: "480", visible: false, visibleStatus: false, roomNum: '1', buttonMode: true, info: {ru: "Свечам самое место на камине"}},
    
    {name: "first_present", width: "107", height: "139", left: "662", top: "799", visible: false, visibleStatus: false, roomNum: '1', buttonMode: false},
    
    {name: "second_present", width: "148", height: "144", left: "1171", top: "797", visible: false, visibleStatus: false, roomNum: '1', buttonMode: false},
    
    {name: "open_box", width: "232", height: "166", left: "1219", top: "803", visible: false, visibleStatus: false, roomNum: '1', buttonMode: false},
    
    {name: "star", width: "66", height: "64", left: "1656", top: "294", visible: false, visibleStatus: false, roomNum: '1', buttonMode: false},
    
    {name: "letter3", width: "65", height: "51", left: "1764", top: "731", visible: false, visibleStatus: false, roomNum: '1', buttonMode: true, info: {ru: ""}},
    
    {name: "left_garland", width: "736", height: "304", left: "-148", top: "9", visible: false, visibleStatus: false, roomNum: '1', buttonMode: true, info: {ru: "Гирлянда хорошо смотрелась бы на потолке.."}},
    
    {name: "right_garland", width: "664", height: "185", left: "1996", top: "465", visible: false, visibleStatus: false, roomNum: '1', buttonMode: true, info: {ru: "Гирлянда хорошо смотрелась бы на потолке.."}},
    
    {name: "left_branch", width: "164", height: "107", left: "1410", top: "179", visible: false, visibleStatus: false, roomNum: '1', buttonMode: false},
    
    {name: "right_branch", width: "177", height: "107", left: "1502", top: "177", visible: false, visibleStatus: false, roomNum: '1', buttonMode: false},
    
    {name: "first_snowflake", width: "35", height: "36", left: "714", top: "681", visible: false, visibleStatus: false, roomNum: '1', buttonMode: false},
    
    {name: "second_snowflake", width: "36", height: "33", left: "725", top: "738", visible: false, visibleStatus: false, roomNum: '1', buttonMode: false},
    
    {name: "third_snowflake", width: "35", height: "36", left: "1043", top: "769", visible: false, visibleStatus: false, roomNum: '1', buttonMode: false},
    
    {name: "arrow", width: "81", height: "67", left: "1116", top: "692", visible: false, visibleStatus: false, roomNum: '1', buttonMode: false},
    
    {name: "chalk", width: "35", height: "24", left: "321", top: "103", visible: false, visibleStatus: false, roomNum: '1', buttonMode: false},
    
    {name: "key", width: "31", height: "16", left: "886", top: "823", visible: false, visibleStatus: false, roomNum: '1', buttonMode: false},
    
    {name: "people", width: "442", height: "553", left: "137", top: "332", visible: false, visibleStatus: false, roomNum: '1', buttonMode: false},
    
    {name: "open_door", width: "231", height: "685", left: "-43", top: "181", visible: false, visibleStatus: false, roomNum: '1', buttonMode: false},
];

export { arr };