import React, { Component } from "react";
import omsdkInit from "./omsdkInit";

class App extends Component {
  constructor(props) {
    super(props);
    this.video = React.createRef();
    this.ads = [
      {
        // jsresourceurl:
        //   "https://s3-us-west-2.amazonaws.com/omsdk-files/compliance-js/omid-validation-verification-script-v1.js",
        jsresourceurl:
          "https://static.line-scdn.net/iab/edge/r/omsdk-files/compliance-js/omid-validation-verification-script-v1.js",
        venderkey: "iabtechlab.com-omid",
        verificationparam: "iabtechlab-Linecorp"
      }
    ];
  }
  componentDidMount() {
    // const videoElement = this.video.current;

    // It is working since the $videoElement is pure video element that injected in public/index.html directly.
    const pureVideoElement = document.querySelector("#ad");
    omsdkInit(this.ads, pureVideoElement);

    // It is not working, and it is video element in a React component
    const reactVideoElement = this.video.current;
    omsdkInit(this.ads, reactVideoElement);
  }
  render() {
    return (
      <React.Fragment>
        <video width="250" ref={this.video} controls>
          <source
            type="video/mp4"
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            poster="https://loremflickr.com/1200/628?text=thm:0%2F19:22:54.626"
            preload="metadata"
          />
        </video>
      </React.Fragment>
    );
  }
}

export default App;
