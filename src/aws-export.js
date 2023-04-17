/* eslint-disable */

const awsmobile = {
  aws_project_region: "eu-west-1",
  aws_user_pools_web_client_id: "1eq93n0cbmugflglr65s9cndjk",
  aws_user_pools_id: "eu-west-1_4H3SVoiDT",
  oauth: {
    domain: "epnd-dev003-amfa.auth.eu-west-1.amazoncognito.com",
    scope: ["openid", "profile", "aws.cognito.signin.user.admin"],
    redirectSignIn: "https://amfa.netlify.app/",
    redirectSignOut: "https://amfa.netlify.app/",
    responseType: "code"
  }
};

export default awsmobile;
