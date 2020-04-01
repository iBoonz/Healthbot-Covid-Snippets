var DEV_URL = 'http://localhost:54632';
var PROD_URL = '';
var botFrame;
var Embed = (function () {
    function Embed() {
        this.language = navigator.language ? navigator.language.toLowerCase() : 'en-us';
        this.isRunning = false;
    }
    Embed.prototype.init = function (settings) {
        this.settings = settings;
        this.botUrl = this.settings.dev ? DEV_URL : PROD_URL;
        this.renderTemplate(settings.target || 'body');
    };
    Embed.prototype.close = function () {
        var loaderElm = document.getElementById('floating-bot-loader');
        var bottonImage = document.getElementById('floating-bot-image');
        var callToActionUri = botUrl + "/images/CallToAction.png";
        var bottonElm = document.getElementById('floating-bot');
        this.isRunning = false;

        if (loaderElm) {
            loaderElm.removeChild(botFrame);
            loaderElm.style.display = 'none';
            bottonImage.src = callToActionUri;
            bottonImage.style.display = 'block';
            bottonElm.style.display = 'block';

        }
    };
    Embed.prototype.start = function () {
        if (!this.isRunning) {
            this.isRunning = true;
            var loadingImageUrl = botUrl + "/images/Loading.png";
            var loaderElm = document.getElementById('floating-bot-loader');
            var bottonElm = document.getElementById('floating-bot');
            var url = botUrl + "?source=" + location.href + "&lang=" + this.language;
            if (!this.mobilecheck()) {
                botFrame = document.createElement("iframe");
                var bottonImage = document.getElementById('floating-bot-image');
                botFrame.src = url;
                botFrame.width = "403px";
                botFrame.height = "703px";
             
                botFrame.onload = function () {
                    setTimeout(function () {
                        bottonElm.style.display = 'none';
                        loaderElm.style.display = 'block';
                    }, 1300);
                };
                loaderElm.appendChild(botFrame);
                bottonImage.src = loadingImageUrl;
                this.changeLanguageInner();
            }
            else {
                this.changeLanguageInner();
                this.botWindow = window.open(url);
                bottonElm.style.display = 'none';
            }
        }
    };
    Embed.prototype.restart = function () {
        this.changeLanguage();
    };

    Embed.prototype.changeLanguage = function () {
        var loaderElm = document.getElementById('floating-bot-loader');
        var bottonElm = document.getElementById('floating-bot');
  
        bottonElm.style.display = 'block';
        loaderElm.style.display = 'none';
        this.language = document.getElementById('floating-bot-loader-lang').value;
        var url = botUrl + "?source=" + location.href + "&lang=" + this.language;
        this.changeLanguageInner();
        setTimeout(function () {
            bottonElm.style.display = 'none';
            loaderElm.style.display = 'block';
        }, 1300);

        if (this.botWindow) {
            this.botWindow.location.href = url;
        }
        else {
            botFrame.src = url;
        }
    };

    Embed.prototype.changeLanguageInner = function(){
        var closeBtn = document.getElementById('closeBtn');
        var restartBtn = document.getElementById('restartBtn');
        if (this.language === "sv-se") {
            closeBtn.innerHTML = "AVSLUTA";
            restartBtn.innerHTML = "GÖR OM";
        } else {
            closeBtn.innerHTML = "CLOSE";
            restartBtn.innerHTML = "RESET";
        }
    };
    Embed.prototype.mobilecheck = function () {
        var check = false;
        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
                check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    };
    Embed.prototype.renderTemplate = function (target) {
        var container = document.createElement('div');
        container.innerHTML = getTemplate(botUrl, this.language);
        var targetElm = document.querySelector(target);
        if (targetElm) {
            targetElm.appendChild(container);
        }
    };
    return Embed;
}());

var Covid19Embed = new Embed();
window.Covid19Embed = Covid19Embed;
function getTemplate(url, lang) {

    return `<style>
          .animated {
            -webkit-animation-duration: 5s;
            animation-duration: 5s;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
        }
        
        .shake {
            -webkit-animation-name: shake;
            animation-name: shake;
        }
        
        @-webkit-keyframes shake {
            0%,
            100% {
                -webkit-transform: translateX(5px);
            }
            10%,
            30%,
            50%,
            70%,
            90% {
                -webkit-transform: translateX(5px);
            }
            20%,
            40%,
            60%,
            80% {
                -webkit-transform: translateX(-5px);
            }
        }
        
        @keyframes shake {
            0%,
            100% {
                transform: translateX(5px);
            }
            10%,
            30%,
            50%,
            70%,
            90% {
                transform: translateX(5px);
            }
            20%,
            40%,
            60%,
            80% {
                transform: translateX(-5px);
            }
        }
    
        #floating-bot {
            display: block;
            position: fixed;
            bottom: 40px;
            right: -10px;
            z-index: 999999;
        }
    
        #floating-bot-loader {
            position: fixed;
            display: none;
            overflow: hidden;
            right: 0;
            bottom: 0;
            z-index: 999999;
            border: thin solid #2278D3;
        }
        
        #floating-bot-loader iframe {
            overflow: hidden;
            border: 0;
        }        
        
        #botCloseButton {
            height: 35px;
            background-color: #2278D3;
        }
    
        #botCloseButton .botCloseButtonLeft {
            float: left;
            padding: 7px;  
        }
        
        #botCloseButton .botCloseButtonLeft .globe {
            margin: 1px 2px 0 5px;
            width: 16px;
            height: 16px;
            float: left;
            background: no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF+mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIwLTAzLTIxVDEyOjQ1OjQwKzAxOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMC0wMy0yMVQxNDo0NzoxNCswMTowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMC0wMy0yMVQxNDo0NzoxNCswMTowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpjMGU4ZWU4ZS1lZWM3LTg5NGUtYWI2Mi1iMjFkMjE0ZDM5ZDgiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDowZWY0ZjdiYS1hZTE4LTBkNGEtYWFlMi03OTk2NTNiOWIyZjEiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2NmJhZTBkNC0yNGI5LTkwNDYtYTI2YS05MTU3YjY5Mzk3MTgiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjY2YmFlMGQ0LTI0YjktOTA0Ni1hMjZhLTkxNTdiNjkzOTcxOCIgc3RFdnQ6d2hlbj0iMjAyMC0wMy0yMVQxMjo0NTo0MCswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpjMGU4ZWU4ZS1lZWM3LTg5NGUtYWI2Mi1iMjFkMjE0ZDM5ZDgiIHN0RXZ0OndoZW49IjIwMjAtMDMtMjFUMTQ6NDc6MTQrMDE6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz68fJbmAAABYklEQVQ4y42TS0oDQRCG28Qr6CYo3sJcQhTErRE8gKAXEMFIXLmW6DaKAV2JaxPDQBAEleAj0WCIibp0KY5/4dfQGfAx8A3VNVU1XS8Xx3FKDAsHGbEk6qIFdXSZwM580i7hvCl68ffTFNfiUtyiexGFMIi9hjjsippYE3106yKP3BWrIsLWdCkfaZk/zIhjUeJmJ2DynjgUU9iumK85j4gPURYXfLwRbfEOVocG386xtWfUAhTFAzfJke+EyIozURWTYkzcYeMIuuOFBZRb4iAo0jb4cxkbh0/LcbVT8nsTHWTjGfy5QydMrliXHPnWUFqln/4I8JoM8CgWudaG2P9nCjmfQpE6mDxHSuMUrgpZCmsFnk8W0dr4SZ8j2tPAwLexTaoxkznQxnCQpsURwZKDVGLIZpODlApGOWJcu+jywSj3GfNKcpTDZSrQpph8r1ioJroeCzewTOlf1vkeflznLwNagRKedtihAAAAAElFTkSuQmCC);
        }
        
        #botCloseButton .botCloseButtonLeft select {
            float: left;
            font-size: 15px;
            font-family: sans-serif;
            color: #000;
            border: 0 none;
            background-color: #2278D3;
            color: #fff;
           margin-top: -1px;
        }
    
        #botCloseButton .botCloseButtonRight {
              display: block;
            width: 68px;
            height: 20px;
            float: right;
            margin: 6px 10px 0 0;
            content: "X";
            color: white;
            text-decoration: none;
            font-size: 15px;
            text-align: right;
          }
    </style>
    
    <div id="floating-bot-loader">
        <div id="botCloseButton">
            <div class="botCloseButtonLeft">
                <div class="globe"></div>
                <select id="floating-bot-loader-lang" onchange="javascript:Covid19Embed.changeLanguage()">
                <option value="da-dk" ${lang === 'da-dk' ? 'selected' : ''}>Dansk</option>
                <option value="sv-se" ${lang === 'sv-se' ? 'selected' : ''}>Svenska</option>
                <option value="en-us" ${lang === 'en-us' ? 'selected' : ''}>English</option>
                </select>
            </div>
            <a class="botCloseButtonRight" id="closeBtn" href="javascript:Covid19Embed.close()"></a>
            <a class="botCloseButtonRight" id="restartBtn" href="javascript:Covid19Embed.restart()"></a>
        </div>
    </div>
    <div id="floating-bot" class="shake animated">
        <a href="javascript:Covid19Embed.start()"><img id="floating-bot-image" src="${url}/images/CallToAction.png" alt="Open chatbot" style="width:300px;"></a>
    </div>`;
}
