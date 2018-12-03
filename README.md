### Redis

Install

    $ brew install redis

Start services

    $ brew services start redis

Check redis

    $ redis-cli ping

Entry redis-cli

    $ redis-cli

Redis command : [Command Refs by Redis](https://redis.io/commands)

### Git Remote

See original git remote path

    $ git remote -v

Remove original git remote path

    $ git remote remove origin

Add new Remote path

    $ git remote add origin 'your github repos path'

### Proxy Sample

```javascript
class Page {
  goto() {
    console.log('Im going to another page');
  }
  setCookie() {
    console.log('Im setting a cookie');
  }
}

class CustomPage {
  static build() {
    const page = new Page();
    const customPage = new CustomPage(page);

    const superPage = new Proxy(customPage, {
      get: function(target, prop) {
        return target[prop] || page[prop];
      },
    });

    return superPage;
  }

  constructor(page) {
    this.page = page;
  }

  login() {
    this.page.goto('localhost:3000');
    this.page.setCookie();
  }
}

const superPage = CustomPage.build();

superPage.login();
superPage.setCookie();
```

### Travis CI

As npm install Error

 -> More options -> caches -> clear

### Upload File to S3

* create bucket

* 'get' signedUrl to client

* client call 'put' file to s3 signedUrl

* get url & s3 domain to show upload-image

### Refs And Copyrights

[Node JS: Advanced Concepts](https://www.udemy.com/advanced-node-for-developers)
