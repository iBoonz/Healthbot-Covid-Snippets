# Healthbot web chat client implementation instructions

## Implementation on an existing homepage

The HTML on the containing website should contain the elements as shown in the example below:

```HTML

<head>
    <link rel="stylesheet" href="~/css/site.css" />
</head>
<body>
    <script src="https://cdn.botframework.com/botframework-webchat/latest/webchat-es5.js"></script>
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha256-pasqAKBDmFT4eHoN2ndd6lN370kFiGUFyTiUHWhU7k8=" crossorigin="anonymous"></script>
    <script src="~/js/site.js" asp-append-version="true"></script>

    <header id="botContainerHeader" style="display:none">
        <span id="closeBot">Sluiten</span>
    </header>
    <div id="botContainer" style="display:none"></div>


    <div id="floating-bot-loader" style="display: none;">
        <img id="bot-loader" src="~/images/Loading.png" alt="" style="width:300px;">
    </div>

    <div id="floating-bot" class="animated shake" style="display: none;">
        <img id="floating-bot-image" src="~/images/CallToAction.png" alt="" style="width:300px;">
    </div>

</body>
</html>
```

- A default site.css stylesheet is provided as part of the solution and can be changed upon need.
- An example of required image can be provided. These will have to be changed to represent the corporate identity.
- The webchat and jquery client code is obtained from a cdn and shouldn't need changing
- The site.js is provided and contains the code to connect to the chat bot
    - Make sure the URL to the Azure Function is correct
    - Make sure the URL to the mobile page is correct
    - Make sure the scenario name in `trigger: "Covid19"` is correct
    - Make sure the locale for translations is correct
- The header and div's with a specific id should be present in the html and are used to display the web chat

## Implementation of the mobile version

The site.js code contains logic to redirect to a specific url for the mobile version of the chat bot.
See the example page below:

```HTML
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="~/css/siteframe.css" />
</head>

<body>
    <script src="https://cdn.botframework.com/botframework-webchat/latest/webchat-es5.js"></script>
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha256-pasqAKBDmFT4eHoN2ndd6lN370kFiGUFyTiUHWhU7k8=" crossorigin="anonymous"></script>
    <script src="~/js/siteframe.js" asp-append-version="true"></script>

    <div id="botContainer" style="display:none"></div>

    <noscript>
        Please enable Javascript to use this bot.
    </noscript>
    <div id="notSupported" style="display:none;padding-top: 200px;text-align: center;">
        <img src="~/images/notSupported.png" />
    </div>
    <script>
        setTimeout(function () {
            if (!window.supported) {
                document.getElementById("notSupported").style.display = "block";
            }
        }, 4000);
    </script>
</body>

</html>
```

- A default siteframe.css stylesheet is provided as part of the solution and can be changed upon need
- The webchat and jquery client code is obtained from a cdn and shouldn't need changing
- The siteframe.js is provided and contains the code to connect to the chat bot
    - Make sure the URL to the Azure Function is correct
    - Make sure the scenario name in `trigger: "Covid19"` is correct
    - Make sure the locale for translations is correct
- The botcontainer div should be present in the html and is used to display the web chat