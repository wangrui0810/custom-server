var pg = require('pg'); //加载模块node-postgres,该模块要与本文件放于同一个目录下
var conString = "tcp://postgres:wxyc2015@192.168.150.27/position_db";//此时数据库必须已经创建
conString = "tcp://postgres:ZZS2012@58.83.196.218/position_db";
//anything://user:password@host:port/database

function getData(callback)
{
    var client = new pg.Client(conString);
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }

        //查询
        client.query("select * from today_sum;", function (error, results) {
            console.log("in callback function.\n");
            if (error) {
                console.log("error");
                console.log('GetData Error: ' + error.message);
                client.end();
                return;
            }
            if (results.rowCount > 0) {
                //callback(results);
                //指定为json格式输出


                //先将results 字符串内容转化成json格式，然后响应到浏览器上
                var firstResult,
                    resultSet='';

                var re = [];
                for(var i=0,len=results.rowCount;i<len;i++)
                {
                    firstResult=results.rows[i];
                    resultSet+='acct:'+firstResult['acct']+''+'pos_date:'+firstResult['pos_date']+'\n';
                    re.push(firstResult.acct);
                    re.push(firstResult.pos_date);
                }
                callback(re);
            }
        });

    })
};

module.exports = {
    getData:getData
};