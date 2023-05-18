/* eslint-disable */

const awsmobile = {
  aws_project_region: "eu-west-1",
  aws_user_pools_web_client_id: "70dvlc9ejuifcbkf6r6erhm2d7",
  aws_user_pools_id: "eu-west-1_JWLJWzEWf",
  oauth: {
    domain: "epnd-dev004-apersona.auth.eu-west-1.amazoncognito.com",
    scope: ["openid", "profile", "aws.cognito.signin.user.admin"],
    redirectSignIn: "https://amfa.netlify.app/",
    redirectSignOut: "https://amfa.netlify.app/",
    responseType: "code"
  }
};

export default awsmobile;
