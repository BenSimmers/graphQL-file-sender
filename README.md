# graphql-file-sender

GraphQL File Sender is an Express and Node.js application that allows you to send files from a server to a client using the GraphQL API. It includes encoding and decoding of files in base64 format for seamless transmission and retrieval. This project also provides an Apollo Client and React plugin for easy integration into your existing React applications.


## Installation
Option  1: Install using npm
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
On the client end you have 2 methods
1. base64ToArray - Converts a base64 string to a Uint8Array for file decoding and constructing a file from the GraphQL API.
2. handleDownload - handles the client download of the file. (Note: this function use the `base64ToArray` function to convert the base64 string to a Uint8Array)

```typescript
import { base64ToArray, handleDownload } from 'graphql-file-sender';

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

const DownLoadFile = () => {
  const { loading, error, data } = useQuery(GET_FILE);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const { filename, mimetype, content } = data.file;
  const fileData = { filename, mimetype, content };
  return (
    <div>
      <button onClick={() => handleDownload({ file: fileData })}>Download</button>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <DownLoadFile />
      </div>
    </ApolloProvider>
  );
};

export default App;
```


### Server
On the server end you have 1 method for Express
- deconstructFile - this function will only take a filename of a string, so you can generate the pdf however you want. This plugin only helps with the transmission of the file. (Note: this is only for express graphql servers!!! If you are using a different server, you will have to implement the logic yourself)

- you will have to add the file to your schema and rootValue. (Note: the file must be named file)




```typescript
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

//.. another other imports you need

const schema = buildSchema(`
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
    content: String!
  }
  
  type Query {
    hello: String
    test: String
    file: File
  }
`);

const root = {
  file: () => {
    // return deconstructFile("new.pdf");
    return deconstructFile("new.pdf");
  },
};

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use("/graphql", graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
```

## Contributions are welcome! 
If you find any bugs or have suggestions for improvement, please open an issue or submit a pull request.