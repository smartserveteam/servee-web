export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "eu-central-1",
    BUCKET: "notes-app-uploads351"
  },
  apiGateway: {
    REGION: "eu-central-1",
    URL: "https://22e751g7i4.execute-api.eu-central-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "eu-central-1",
    USER_POOL_ID: "eu-central-1_5v1HNXCiJ",
    APP_CLIENT_ID: "6638nn1gjggdul1sm3e7atn2e1",
    IDENTITY_POOL_ID: "eu-central-1:9fce1e39-e7ee-452b-97e0-ceb5f791f51b"
  },
  social: {
    FB: "437354300382315"
  }
};
