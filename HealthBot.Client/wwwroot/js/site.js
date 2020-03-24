function startChat() {
    if (mobilecheck()) {
        window.open("YOURWEBSITE/Home/IndexFrame");
        document.getElementById('floating-bot').style.display = 'none';
        return;
    }

    document.getElementById('floating-bot').style.display = 'none';
    document.getElementById('floating-bot-loader').style.display = 'block';

    var store = window.WebChat.createStore(
        {},
        function (store) {
            return function (next) {
                return function (action) {
                    if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {
                        store.dispatch({
                            type: 'WEB_CHAT/SEND_EVENT',
                            payload: {
                                name: 'webchat/join',
                                value: { language: window.navigator.language }
                            }
                        });
                    }
                    return next(action);
                }
            }
        }
    );

    var Http = new XMLHttpRequest();
    const url = 'YOUR FUNCTION THAT GENERATES A TOKEN';
    Http.open("GET", url);
    Http.setRequestHeader("Cache-Control", "no-cache");
    Http.setRequestHeader("Pragma", "no-cache");
    Http.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");
    Http.send();

     Http.onreadystatechange = function (e) {
        if (Http.readyState === XMLHttpRequest.DONE) {
            var status = Http.status;
            if (status === 0 || (200 >= status && status < 400)) {
                const tokenPayload = JSON.parse(atob(Http.responseText.split('.')[1]));
                var dl = window.WebChat.createDirectLine({ token: tokenPayload.connectorToken });
                window.WebChat.renderWebChat({
                    directLine: dl,
                    userID: tokenPayload.userId,
                    username: tokenPayload.userName,
                    locale: 'en-us',
                    botAvatarInitials: 'Bot',
                    userAvatarInitials: tokenPayload.userName.substr(0, 3),
                    styleOptions: {
                        hideUploadButton: true
                    },
                    store:store
                }, document.getElementById('botContainer'));

                var user = {
                    id: tokenPayload.userId,
                    name: tokenPayload.userName
                };
                window.supported = true;
                dl.postActivity({
                    type: "invoke",
                    value: {
                        trigger: "Covid19"
                    },
                    from: user,
                    name: "TriggerScenario",
                    locale: 'en-us'

                }).subscribe(function (id) {
                    document.getElementById('botContainer').style.display = 'block';
                    document.getElementById('botContainerHeader').style.display = 'block';
                    document.getElementById('floating-bot-loader').style.display = 'none';
                });
            }
        }
    };
}

function mobilecheck() {
    var check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};


function closeChat() {
    document.getElementById('floating-bot').style.display = 'block';
    document.getElementById('botContainer').style.display = 'none';
    document.getElementById('botContainerHeader').style.display = 'none';
    document.getElementById('floating-bot-loader').style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function (event) {

    document.getElementById('floating-bot').style.display = 'block';

    var floatingLink = document.getElementById("floating-bot");
    var closeBotLink = document.getElementById("closeBot");

    floatingLink.onclick = startChat;
    closeBotLink.onclick = closeChat;
});

setInterval(function () {
    // remove all buttons except the selected one, change its color, and make unclickable
    var buttons = document.getElementsByClassName("ac-pushButton");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", selectOption);
        buttons[i].addEventListener("click", adaptiveCardsOption);

        var allChildren = buttons[i].childNodes;
        for (let j = 0; j < allChildren.length; j++) {
            allChildren[j].addEventListener("click", selectParentOption);
        }
    }
}, 10);


function selectOption(event) {
    disableButtons(event.target);
}

function selectParentOption(event) {
    var children = event.target.parentNode.parentNode.childNodes;
    disableParentButtons(children, event.target.innerText);
}

function adaptiveCardsOption(event) {
    var columnSet = $(event.target).closest(".ac-columnSet")[0];
    if (columnSet) {
        var buttonsInColumnSets = columnSet.childNodes;
        for (let j = 0; j < buttonsInColumnSets.length; j++) {
            var columnSetButtons = buttonsInColumnSets[j].querySelectorAll("button");
            if (columnSetButtons) {
                disableParentButtons(columnSetButtons, event.target.parentNode.parentNode.innerText);
            }
        }
    }
}

function grayButton(button) {
    button.style.backgroundColor = "#d9d9d9";
    button.style.color = "#ffffff";
    button.height = "37px";
}

function blueButton(button) {
    button.style.backgroundColor = "#0078d7";
    button.style.color = "white";
    button.height = "37px";
}

function disableParentButtons(children, targetButton) {
    for (let i = 0; i < children.length; i++) {
        var alreadhClicked = false;
        for (var j = 0; j < children[i].classList.length; j++) {
            if (children[i].classList[j] === "old-button" || children[i].classList[j] === "expandable") {
                alreadhClicked = true;
                break;
            }
        }

        if (children[i].nodeName === "BUTTON" && !alreadhClicked) {
            if (children[i].innerText) {

                if (children[i].innerText !== targetButton) {
                    grayButton(children[i]);
                } else {
                    blueButton(children[i]);
                }
                children[i].classList.remove("ac-pushButton");
                children[i].classList.add("old-button");
                setTimeout(function () {
                    if (children[i] !== null) {
                        children[i].onclick = "null";
                    }
                }, 50);
                children[i].removeEventListener("click", selectOption);
                children[i].style.outline = "none";
                children[i].style.cursor = "not-allowed";
            }
        }
    }
}

function disableButtons(targetButton) {
    var alreadyClicked = false;
    for (var j = 0; j < targetButton.classList.length; j++) {
        if (targetButton.classList[j] === "old-button" || targetButton.classList[j] === "expandable") {
            alreadyClicked = true;
            break;
        }
    }
    for (var k = 0; k < targetButton.parentNode.classList.length; k++) {
        if (targetButton.parentNode.classList[k] === "old-button" || targetButton.parentNode.classList[k] === "expandable") {
            alreadyClicked = true;
            break;
        }
    }

    if (alreadyClicked) {
        return;
    }

    blueButton(targetButton);
    targetButton.classList.add("old-button");
    targetButton.parentNode.parentNode.parentNode.parentNode.style.cursor = "not-allowed";
    var allChildren = targetButton.parentNode.childNodes;

    for (let i = 0; i < allChildren.length; i++) {
        if (allChildren[i].innerText) {
            if (allChildren[i].innerText !== targetButton.innerText) {
                grayButton(allChildren[i]);
            }
            allChildren[i].classList.remove("ac-pushButton");
            allChildren[i].classList.add("old-button");
            allChildren[i].onclick = "null";
            allChildren[i].removeEventListener("click", selectOption);
            allChildren[i].style.outline = "none";
            allChildren[i].style.cursor = "not-allowed";
        }
    }
}


