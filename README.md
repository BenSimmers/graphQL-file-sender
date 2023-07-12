# graphql-file-sender

GraphQL File Sender is an Express and Node.js application that allows you to send files from a server to a client using the GraphQL API. It includes encoding and decoding of files in base64 format for seamless transmission and retrieval. This project also provides an Apollo Client and React plugin for easy integration into your existing React applications.

## Installation

Option 1: Install using npm

```bash
npm install graphql-file-sender
```

Option 2: Install using yarn

```bash
yarn add graphql-file-sender
```

Option 3: Clone the repository

```bash
git clone https://github.com/BenSimmers/graphQL-file-sender.git
```

## Usage

### Client

On the client end you have 2 methods 2. handleDownload - handles the client download of the file. (Note: this function uses an exportable `base64ToArray` function to convert the base64 string to a Uint8Array)

```typescript
import { handleDownload } from 'graphql-file-sender';
// or
const { handleDownload } = require('graphql-file-sender');
```

- Something you will need to do is add this query to your client. this will query the server for the file.

```typescript
const GET_FILE = gql`
  query GetFile {
    file {
      filename
      mimetype
      encoding
      content
    }
  }
`;
```

- Then you can link the `handleDownload` function to a button or any other event you want. (Note: this function takes in the data from the query as a parameter)
- This

```typescript
const DownLoadFile: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { loading, error, data } = useQuery(GET_FILE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <button onClick={() => handleDownload(data)}>Download</button>
    </div>
  );
};
```

### Server

On the server end you have 1 method for Express but there is some setup you need to do first.

1. Import the `deconstructFile` function from the package

```typescript
import { deconstructFile } from 'graphql-file-sender';
```

2. Setup the Express server and GraphQL endpoint as you normally would. (Note: you will need to add the `cors` package to your server)

3. Then you need to make an addition to your GraphQL schema. You need to add a `File` type to your schema. This will be used to return the file data to the client. (Note: the `content` field is the base64 encoded string of the file)

```typescript
const FileSchema = `
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
    content: String!
  }
`;

const schema = buildSchema(`
  ${FileSchema}
  
  type Query {
    hello: String
    test: String
    file: File
  }
`);
```

4. When you create the root object for your GraphQL server, you need to add a resolver for the `file` query. This resolver will return the file data to the client. (Note: the `deconstructFile` function takes 2 parameters, 1 is the project root directory and the other is the a generatePdf function, the generate pdf parameter is optional and i recommend making your own function to generate a pdf file with code). Hell, even make a PR to add your own function to the package it would be greatly appreciated :)

```typescript
const projectDirectory = __dirname;

const root = {
  file: () => {
    return deconstructFile(projectDirectory);
  },
};
```

5. At the moment inside the source code ive made a template to generate a pdf file with code. Its very simple and I recommend making your own inside your own api. Have a read through the source code to see how it works.

## Apollo Client Integration

This project also provides a seamless integration with Apollo Client and React, so set up apollo client as you normally would with your React application. All you have to do is add the plugin to your app and you are good to go. For example:


```typescript
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

const client = new ApolloClient({
  link: createUploadLink({
    uri: 'http://localhost:4000/graphql',
  }),
  cache: new InMemoryCache(),
});
```


## Contributions are welcome!
If you find any bugs or have suggestions for improvement, please open an issue or submit a pull request.
