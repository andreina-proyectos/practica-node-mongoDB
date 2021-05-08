const htmlContentTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
      crossorigin="anonymous"
    />
    <link rel="stylesheet" href="main.css" />
    <title>Playing with Node and Mongo!</title>
    <style>
    body {
        padding: 20px;
        background-image: linear-gradient(to right top, #845ec2, #806ecc, #7e7cd4, #7d8adb, #7f97e1, #76a5eb, #6eb2f2, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1);
    }

    .list-title {
        color: white
    }

    .card {
      margin-bottom: 12px
    }
    .card p {
        padding: 2px 8px
    }
    </style>
  </head>
  <body>
  <h1 class="list-title">USERS LIST UPDATE</h1>
  <div class="container">
    <ul class="list-group list-group-flush" id="users-list">
        {usersList}
    </ul>
  </div>

    <script
      src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
      integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
      crossorigin="anonymous"
    ></script>
  </body>
</html>
`;

function mapUser(user) {
  return `
    <li class="card">
        <p class="card-header">Name: ${user.Name} ${user.LastName} 😊</p>
        <p>Phone: ${user.Phone}</p>
        <p>Favorite color: ${user.FavoriteColor}</p>
        <p>Age: ${user.Age}</p>
        <p>Wish: ${user.Wish}</p>
    </li>
  `;
}

const returnHtmlContent = (arrayOfUsers) => {
  const mappedUserList = arrayOfUsers.map((user) => mapUser(user));
  let htmlContent = htmlContentTemplate;
  htmlContent = htmlContent.replace('{usersList}', mappedUserList.join(''));

  return htmlContent;
};

module.exports = returnHtmlContent;
