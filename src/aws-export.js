/* eslint-disable */

const awsmobile = {
  aws_project_region: "eu-west-1",
  aws_user_pools_web_client_id: "d830k457bn9934mv4hurol90j",
  aws_user_pools_id: "eu-west-1_k9kQEhBTH",
  oauth: {
    domain: "epnd-dev004-apersona.auth.eu-west-1.amazoncognito.com",
    scope: ["openid", "profile", "aws.cognito.signin.user.admin"],
    redirectSignIn: "https://amfa.netlify.app/",
    redirectSignOut: "https://amfa.netlify.app/",
    responseType: "code"
  }
};

export default awsmobile;
