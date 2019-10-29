# Run with docker

To build the image
```console
  $user@current_folder: docker build -t test-reactjs .
```

Start the server
```console
  $user@current_folder: docker run -it -p 8080:8080 test-reactjs
```

This site ready at: localhost:8080

# Run as development

```console
  $user@current_folder: npm install
```

Then

```console
  $user@current_folder: npm start
```

This site ready at: localhost:3000