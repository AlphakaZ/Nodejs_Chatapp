
        $(function(){
            //名前と部屋名の初期化
            //todo: デフォルトのルーム名を追加
            var NICK_KEY = "chat_nickname";
            var ROOM_KEY = "chat_roomname";
            if($.cookie(NICK_KEY)==undefined){
                $.cookie(NICK_KEY, 'hogehoge', {expires: expiration});
            }
            if($.cookie(ROOM_KEY)==undefined){
                $.cookie(ROOM_KEY, 'fugafuga', {expires: expiration});
            }

            $('#nick').html("<p>NAME:"+$.cookie('NICK_KEY')+"</p>");            $('#room').val($.cookie('ROOM_KEY'));
            $('#room').html("<p>ROOM:"+$.cookie('ROOM_KEY')+"</p>");            $('#room').val($.cookie('ROOM_KEY'));
            
        })();