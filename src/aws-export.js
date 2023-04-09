/* eslint-disable */

const awsmobile = {
  aws_project_region: "eu-west-1",
  aws_user_pools_web_client_id: "61uc0k2m4rvckn5gvn78v8p62d",
  aws_user_pools_id: "eu-west-1_cXCwPjWWC",
  oauth: {
    domain: "epnd-dev001-amfa.auth.eu-west-1.amazoncognito.com",
    scope: ["openid", "profile", "aws.cognito.signin.user.admin"],
    redirectSignIn: "https://amfa.netlify.app/",
    redirectSignOut: "https://amfa.netlify.app/",
    responseType: "code"
  }
};

export default awsmobile;
