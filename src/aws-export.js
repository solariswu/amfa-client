/* eslint-disable */

const awsmobile = {
  aws_project_region: "eu-west-1",
  aws_user_pools_web_client_id: "4i8rhccqnm68gd0to8bvkbt60c",
  aws_user_pools_id: "eu-west-1_vitRQ9sum",
  oauth: {
    domain: "amfa-dev004-apersona.auth.eu-west-1.amazoncognito.com",
    scope: ["openid", "profile", "aws.cognito.signin.user.admin"],
    redirectSignIn: "https://amfa.netlify.app/",
    redirectSignOut: "https://amfa.netlify.app/",
    responseType: "code"
  }
};

export default awsmobile;
