const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const wallpaper = require("wallpaper");
const async = require("async");
const iconv = require("iconv-lite")
const filter=require("bloom-filter-x");
//filter.add("字符串")
//数据库的增删改查
const mysql = require("mysql");

//wiki
//1.初始化布隆过滤器
//    从数据库中读取已有的url
//    添加到布隆过滤器中
//2.定时抓取新闻网站上的数据
//  根据布隆过滤器做判断，是否具有新的新闻
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "wuif1805",
});
connection.connect();
//npm install request -s
//npm install cheerio -s
//node index.js

//放在setinterval中处理
//去重


//体验async的用法
// for(let i=0;i<3;i++){
//     setTimeout(function(){
//         console.log("a")
//     },2000)
// }

// async.eachLimit(["user1","user2","user3"],1,function(v,next){
//     setTimeout(function(){
//         console.log(v);
//         next(null);
//     },1000)
//
// })
//
// let fun=function(){
//     for(i=0;i<3;i++){
//         console.log(1)
//     }
// async.eachLimit(["user1","user2","user3"],1,function(v,next){
//     setTimeout(function(){
//         console.log(v);
//         next(null);
//     },1000)
// })

//获取百度img图片的网址
// request.get(
//     "http://news.baidu.com/",
//     (err,res,body)=>{
//         let $=cheerio.load(body);
//         $("img").each((k,v)=>{
//             let src=$(v).attr("src");
//             if(!src.startsWith("http:")){
//                 src="http:"+src;
//             }
//             console.log(src)
//         })
//     }
// )


//下载今日头条页面的图片
// request(
//     "https://www.toutiao.com//api/pc/feed/?category=%E7%BB%84%E5%9B%BE&utm_source=toutiao&max_behot_time=0&as=A1058B28B6256A7&cp=5B86A5F6BA77BE1&_signature=6Ee83gAAs8xCaPxeptUQLehHvM",
//     function(error,response,body){
//         let o=JSON.parse(body);
//         o.data.forEach((v,i)=>{
//             let src=v.middle_image;
//             console.log(src)
//             let s=fs.createWriteStream("./tt-"+i+".png");
//             request(src).pipe(s)
//             s.on("finish",()=>{
//                 console.log("end")
//             })
//         })
//     }
// )


//获取站酷上边的图片
// request(
//     "https://www.zcool.com.cn/",
//     function(error,response,body){
//         let $=cheerio.load(body);
//         $(".card-img img").each((k,v)=>{
//             let src=$(v).attr("src");
//             // if(){
//             //
//             // }
//             request(src).pipe(fs.createWriteStream("./zk-"+k+".png"))
//         })
//     }
// )


//从bing网站获取图片
// request(
//     "https://cn.bing.com/",
//     function(error,response,body){
//         let $=cheerio.load(body);
//         let img=$("img").last().attr("src");
//         let src="https://cn.bing.com"+img;
//         let s=fs.createWriteStream("./bing.jpg")
//         request(src).pipe(s)
//         s.on("finish",()=>{
//             wallpaper.set("./bing.jpg").then(()=>{
//                 console.log("done");
//             })
//         })
//     }
// )


// let delete_sql="delete from news where a=?"
// connection.query(delete_sql,[2],function(error,result,field){
//     if(error) throw error;
//     console.log(result.affectedRows);
// });



// //中关村在线的新闻列表
// setInterval(function(){
//     //删
//     let delete_sql="delete from news where a=?"
//     connection.query(delete_sql,[2],function(error,result,field){
//         if(error) throw error;
//         console.log(result.affectedRows);
//     });
//     request({
//             url: "http://news.zol.com.cn/",
//             encoding: null,
//         },
//         function (err, res, body) {
//             body = iconv.decode(body, "gb2312");
//             let $ = cheerio.load(body);
//                 async.eachLimit($(".content-list li"),1,function(v,next){
//                     let url = $(v).find(".info-mod").find("a").first().attr("href");
//                     let des = $(v).find(".info-mod p").contents().eq(0).text();
//                     let title = $(v).find(".info-head a").text();
//                     let n=2;
//                     request(
//                         {
//                             url: url,
//                             encoding: null
//                         },
//                         function (err, res, body) {
//                             body = iconv.decode(body, "gb2312")
//                             let $ = cheerio.load(body);
//                             let time =$(".article-aboute span").eq(0).text();
//                             let con =$("#article-content").html();
//                             let insert_sql = "insert into news (title,des,con,time,a) values (?,?,?,?,?)";
//                             connection.query(insert_sql, [title, des, con,time,n], function (error, result, fields) {
//                                 if (error) throw error;
//                             })
//                             next(null);
//                         }
//                     )
//                 })
//
//
//
//                 //查询
//                 // let select_sql = "select * from news"
//                 // connection.query(select_sql, function (error, result, fields) {
//                 //     if (error) throw error;
//                 //     console.log(result)
//                 // })
//
//                 //增加
//
//
//
//                 //改
//
//                 // let update_sql="update news set des=? where id=?"
//                 // connection.query(update_sql,[6,32],function(error,result,field){
//                 //     if(error) throw error;
//                 //     console.log(result.affectedRows);
//                 // })
//
//             })
// },60000);





//中关村在线新闻
let nownews=function(){
    request({
            url:"http://news.zol.com.cn/",
            encoding:null,
        },
        function(err,res,body){
            body=iconv.decode(body,"gb2312")
            let $=cheerio.load(body);
            let urls=[];
            async.eachLimit($(".content-list li"),1,function(v,next){
                let url= $(v).find(".info-mod").find("a").first().attr("href");
                if(filter.add(url)){
                    urls.push(url);
                    let des = $(v).find(".info-mod p").contents().eq(0).text();
                    let title = $(v).find(".info-head a").text();
                    request(
                        {
                            url: url,
                            encoding: null
                        },
                        function (err, res, body) {
                            body = iconv.decode(body, "gb2312")
                            let $ = cheerio.load(body);
                            let time = $(".article-aboute span").eq(0).text();
                            let content = $("#article-content").html();
                            let insert_sql = "insert into new (title,des,content) values (?,?,?)";
                            connection.query(insert_sql, [title, des, content], function (error, result, fields) {
                                if (error) throw error;
                            })
                        }
                    )
                }
                next(null);
            })
            let nowtime=new Date();
            if(!urls.length){
                console.log(nowtime.toUTCString()+"抓取了一次，本次没有更新")
            }else{
                console.log(nowtime.toUTCString()+"抓取了一次，跟新了"+urls.length+"条数据")
            }
        }
    )
}
nownews();
setInterval(nownews,60*1000);