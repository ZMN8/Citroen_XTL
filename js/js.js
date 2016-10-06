/**
 * Created by Administrator on 2016/9/15.
 */
var json={
    psWidth:640,
    AutoFun:function(){
        var WinWidth=document.documentElement.clientWidth;//屏幕可视宽度
        if(WinWidth>this.psWidth){
            document.documentElement.style.fontSize=625+"%";
        }else{
            document.documentElement.style.fontSize=WinWidth/this.psWidth*625+"%";
        }
    },
    resize:function(){
       window.addEventListener("resize",function(){
           json.AutoFun();
       })
    },
    strFun:function(str){
        str= $.trim(str);
        str=str.replace(/</g,"&lt");
        str=str.replace(/>/g,"&gt");
        return str;
    },
    readyFun:function(){
        window.addEventListener("load",function(){
            $(".zym_main").submit(function(){
                var identifyCode=$(".submit_message input[type='text']").val();
                if(identifyCode==""){
                    alert("请输入验证码！");
                    return false;
                }
            });
            /*点击发送*/
            var subBtn=$(".submit_message input[type='button']");
            subBtn.tap(function(){
                $(this).hide();
                /*后台发送请求*/
               /* $.ajax({
                    type:"get",
                    data:"",
                    url:"",
                    dataType:"json",
                    success:function(){

                    },
                    error:function(a,b,c){
                        console.log(a,b,c);
                    }
                });*/
                var subDIV=$(".submit_message .sub_btn");
                var seconds=59;
                (function jishi(){
                    if(seconds>0){
                        subDIV.css("color","#6f6f6b").text(seconds--+"秒后重发");
                        setTimeout(function(){
                            subDIV.text(seconds+"秒后重发");
                            jishi();
                        },1000);
                    }else{
                        subBtn.show();
                        subDIV.css("color","#fff").text("点击重发");
                    }
                })();
            });
            /*定金抽奖*/
            /*deg
            50:谢谢参与；
            125：四等奖100元
            200：三等奖150
            275：二等奖300
            340：一等奖499
            */
            /*val
             0:谢谢参与；
             1：四等奖100 40%        500张
             2：三等奖150 30%        100张
             3：二等奖300 20%        50张
             4：一等奖499 10%        10张
            */
             var panBtn=$("#pan_btn");
            panBtn.tap(function(){
                var degJson={
                    "0":50,
                    "1":125,
                    "2":200,
                    "3":275,
                    "4":340
                };
                var webJson={
                    "0":"ParticipationAward",
                    "1":"forthPrize",
                    "2":"thirdPrize",
                    "3":"secondPrize",
                    "4":"firstPrize"
                };
                var pan=$("#pan");
                $.ajax({
                    type:"get",
                    url:"/Citroen_XTL/result.json?time="+new Date,
                    dataType:"json",
                    data:{id:1},
                    success:function(resuleJson){
                        var val=resuleJson.result;
                        console.log(val);
                        var angel=degJson[val]+360*2;
                        var webURL=webJson[val];
                        pan.css("transform","rotate("+angel+"deg)");
                        console.log( webURL);
                        setTimeout(function(){
                            var localUrl=String(window.location);
                            localUrl=localUrl.replace(/prize_draw/,webURL);
                            var endPos=localUrl.lastIndexOf("?");
                            localUrl=localUrl.substring(0,endPos);
                            window.location.replace(localUrl);
                        },1500)
                    },
                    error:function(a,b,c){
                        alert("系统忙，请稍后处理");
                        console.log(a,b,c);
                    }
                });
            });
        });


    },


    init:function(){
        this.AutoFun();
        this.resize();
        this.readyFun();
    }
};
json.init();