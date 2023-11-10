export default function omsdkInit(ads, VIDEO_ELEMENT) {
  // Start
  let sessionClient;
  try {
    sessionClient =
      window.OmidSessionClient && window.OmidSessionClient["default"];
  } catch (e) {
    return;
  }

  if (!sessionClient) {
    return;
  }

  const AdSession = sessionClient.AdSession;
  const Partner = sessionClient.Partner;
  const Context = sessionClient.Context;
  const VerificationScriptResource = sessionClient.VerificationScriptResource;
  const AdEvents = sessionClient.AdEvents;
  const MediaEvents = sessionClient.MediaEvents;

  //Identify your Integration
  const CONTENT_URL = "";
  const PARTNER_NAME = "Linecorp1";
  const PARTNER_VERSION = "1.3";

  const partner = new Partner(PARTNER_NAME, PARTNER_VERSION);

  //Create the Context
  const OMSDK_SERVICE_WINDOW = window.top;

  // Assuming you have an `ad` object roughly following VAST 4.1 schema.
  const accessMode = "full";
  const resources = ads.map((context) => {
    const { jsresourceurl, vendorkey, verificationparam } = context;
    return new VerificationScriptResource(
      jsresourceurl,
      vendorkey,
      verificationparam,
      accessMode
    );
  });

  const context = new Context(partner, resources, CONTENT_URL);

  context.setVideoElement(VIDEO_ELEMENT);
  context.setServiceWindow(OMSDK_SERVICE_WINDOW);

  // Create and Start the AdSession
  const adSession = new AdSession(context);
  if (!adSession.isSupported()) {
    return;
  }
  adSession.start();
  // Signal Ad and Video Events
  const adEvents = new AdEvents(adSession);
  const mediaEvents = new MediaEvents(adSession);

  // End
}
