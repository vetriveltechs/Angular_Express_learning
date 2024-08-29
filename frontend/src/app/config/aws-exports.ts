
// src/config/aws-exports.ts
const awsConfig = {
  Auth: {
    region: 'ap-south-1',
    identityPoolId: 'ap-south-1:6d0a3255-3a32-4854-9649-b7c9ef5e689f',
    userPoolId: 'ap-south-1_example',
    userPoolWebClientId: 'example-client-id'
  },
  Storage: {
    bucket: 'peps-new',
    region: 'ap-south-1',
    identityPoolId: 'ap-south-1:6d0a3255-3a32-4854-9649-b7c9ef5e689f' // Required for S3 access
  }
};

export default awsConfig;
