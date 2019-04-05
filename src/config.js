export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "eu-central-1",
    BUCKET: "notes-app-uploads351",
    BUCKET_SKILLS: "servee-skills"
  },
  apiGateway: {
    REGION: "eu-central-1",
    URL_NOTES: "https://3i6hhgx754.execute-api.eu-central-1.amazonaws.com/dev",
    URL_SKILLS: "https://l7jo8umd8g.execute-api.eu-central-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "eu-central-1",
    USER_POOL_ID: "eu-central-1_A5x9SBgkA",
    APP_CLIENT_ID: "7v9e316ei5a250p59be4fh28fe",
    IDENTITY_POOL_ID: "eu-central-1:12683e1d-9d8b-4842-96e1-f8cb233bd104",
    attributes: {
      firstName: "given_name",
      lastName: "family_name",
      address: "address",
      postalCode: "custom:postal_code",
      city: "custom:city",
      state: "custom:state",
      country: "custom:country",
      type: "custom:type"
    }
  },
  social: {
    FB: "437354300382315"
  },
  fields: {
    professional: "professional",
    individual: "individual"
  }
};
