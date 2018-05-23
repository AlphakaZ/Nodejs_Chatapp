var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//読み取りたいファイルはここに記述する
var mime = {
    ".html": "text/html",
    ".css":  "text/css"
}

//ルーティング
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/css/style.css',function(req,res){
    res.sendFile(__dirname + '/css/style.css');
});

var rooms = [];

// サーバ側の処理(ioはサーバが持つオブジェクトか？)
io.on('connection', function(socket){//ioに接続時のアクションを設定(各ソケットが引数)
    console.log('a user connected');

    socket.on('disconnect',function(){//ソケットに、接続が外れた時のアクションを設定
        console.log('user disconnected');
    });

    socket.on('chat message', function(msg){//socketに対し、イベント受信時のアクションを設定
        console.log('message: '+msg.nick + 'from ' + msg.room);//メッセージをログに出力
        
        var message = msg.message;

        var nicknameOption = message.indexOf( '/nick ' );
        if(nicknameOption == 0){
            // ニックネーム変更
            var nick = message.slice(6);
            socket.emit('change nick',nick);
            console.log('change nick: '+nick);
            return;
        }
        
        var roomJoinOption = message.indexOf('/join ');
        
        if(roomJoinOption == 0){
            // ルーム変更
            var room = message.slice(6);
            socket.emit('change room',room);
            console.log('change room: '+room);
            return;
        }
        io.json.emit('chat message', msg);//イベント送信

        // console.log('rooms:'+rooms.join('!!'));
    });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});