const myOptions = {
    roomName: "smsoft", //This is the name of the room. Quite obvious.
    width: 1000,                //Well, you know.
    height: 1000,                //Same as above, just vertical.
    parentNode: document.querySelector('#meet'), //Now, you declare here which element should parent your stream.
    configOverwrite: {startWithAudioMuted: true, startWithVideoMuted: false}, //You can turn on or off config elements with this prop.
    interfaceConfigOverwrite: { TOOLBAR_BUTTONS: [] },  //You can turn on or off interface elements with this prop. check https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe for details
    // jwt: 'yourtokenhere' //Here, you should pass a JWT token for authorization purposes. If you're using jitsi-token-moderation or simiar, make sure the token you pass can start streams
}

export default myOptions;