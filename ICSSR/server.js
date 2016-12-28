var express = require('express');
var superagent = require('superagent');
var ejs = require('ejs');
var app = express();
app.use(express.static(__dirname + '/public'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
var args = process.argv.slice(2);
var email = '',pwd = '',token = '',secret = '';     
if(args[0].indexOf('@') > -1)
{
    email   =   args[0];
    pwd     =   args[1]; 
}else
{
    token   =   args[0]; 
    secret  =   args[1]; 
}


appid   =   args[2] || 'all',
images  =   ["jimlee1996/ssr"];


app.get('/', function(req, res) {
    getit(appid,function(err,data){   
        if(err || !data)
            res.send('没有查询到数据。请检查node启动参数是否正确');
        else    
            res.render('./index.html',{"data":data || []});
    })
});

function getit_by_token(appid,callback)
{
    superagent.get("https://app.arukas.io/api/containers").auth(token, secret, {type:'auto'})
    .end(function(err,sres){
	    var data = sres.body.data;
        if(err)
            return callback(err,null);
        else
            return deal_data(appid,sres.body.data,callback);
    });
}


function getit(appid,callback)
{
    if(email == '')
        return getit_by_token(appid,callback);
    superagent.post("https://app.arukas.io/api/login")
        .send({email: email, password: pwd})
        .end(function(err,lres){
            if(err)
                return callback(err,null);
            var cookie = lres.header['set-cookie'];
            superagent.get("https://app.arukas.io/api/containers")
            .set("Cookie", cookie)
            .end(function(err,sres){
                if(err)
                    return callback(err,null);
                else
                    return deal_data(appid,sres.body.data,callback);
            })
        })
}

//处理结果信息
function deal_data(_appid,data,callback)
{
    var ret_list = [];
	for (var i = 0; i < data.length; i++)
	{
        if(data[i].id == _appid ||(_appid == 'all' && images.indexOf(data[i].attributes.image_name.replace(/:[^ ]+/,''))>-1) )
        {
	        var jn = data[i];	
            console.log(jn);
            if(!jn.attributes.port_mappings)
                continue;
            for (var j = 0; j < jn.attributes.port_mappings.length; j++)
            {
                var host = jn.attributes.port_mappings[j][0].host;
                var ip = host.substring(6,host.indexOf(".")).replace(/-/g,".");
                var service_port = jn.attributes.port_mappings[j][0].service_port;
                var container_port = jn.attributes.port_mappings[j][0].container_port;
                
				var ret_json = {"appid":data[i].id,"server":ip,"server_port":service_port};                    
                ret_list.push(ret_json);
            }
        }
	}
    return callback(null,ret_list);
}

app.get('/:appid',function(req,res){
   var _appid = req.params.appid;
   getit(_appid,function(e,data){
    if(e)
        return res.send(e);
    else
        return res.send(data);
   }); 
})

app.get('/i', function (req, res) {
    res.send('http://51.ruyo.net');
})

app.listen(3999, function () {
  console.log('Example app listening on port 3999')
})
