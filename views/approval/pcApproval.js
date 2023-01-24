module.exports = function (user, req) {
  let data = req['items'];
  let viewData = '';
  let totalArr = [];

  let i = 1;
  for (const item in data) {
    totalArr.push(parseInt(`${data[item].total}`));
    viewData += `<tr style="background-color:${
      i % 2 !== 0 ? 'white' : 'lightsteelblue'
    }"><td>${data[item].name}</td>`;
    viewData += `<td>${(data[item].description, i)}</td>`;
    viewData += `<td>${data[item].cost}</td>`;
    viewData += `<td>${data[item].amount}</td>`;
    viewData += `<td>${data[item].total}</td></tr>`;
    i++;
  }

  // let director = user['Director']

  // let recipient =
  //     totalArr.reduce((x, y) => x + y) <= 50000
  //         ? user['Line Manager Email Address']
  //         : director

  return {
    to: [user['Line Manager Email Address']],
    bcc: 'request-tracker@easysolar.org',
    from: 'techadmin@easysolar.org', // Use the email address or domain you verified above
    subject: `Petty Cash Request from ${user['Full Name']}`,
    html: `
        <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ES PettyCash Form</title>
    <style>
      body,
      p,
      div {
        font-family: inherit;
        font-size: 14px;
      }

      body {
        color: #000000;
      }

      body a {
        color: #1188E6;
        text-decoration: none;
      }

      p {
        margin: 0;
        padding: 0;
      }

      table.wrapper {
        width: 100% !important;
        table-layout: fixed;
        -webkit-font-smoothing: antialiased;
        -webkit-text-size-adjust: 100%;
        -moz-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }

      img.max-width {
        max-width: 100% !important;
      }

      .column.of-2 {
        width: 50%;
      }

      .column.of-3 {
        width: 33.333%;
      }

      .column.of-4 {
        width: 25%;
      }

      ul ul ul ul {
        list-style-type: disc !important;
      }

      ol ol {
        list-style-type: lower-roman !important;
      }

      ol ol ol {
        list-style-type: lower-latin !important;
      }

      ol ol ol ol {
        list-style-type: decimal !important;
      }

      #pettycash {
        margin-top: 20px;
      }

      #pettycash td,
      #pettycash th {
        text-align: center;
        padding: 10px;
        word-wrap: break-word;
      }

      #pettycash th {
        color: #fff;
        background-color: royalblue;
        font-weight: normal;
        width: 100px;
        height: 10px;
      }

      #pettycash tr:nth-child(even) {
        background-color: lightsteelblue;
      }

      #pettycash tr:last-child {
        font-weight: bold;
        text-transform: uppercase;
      }

      .payment td {
        font-weight: bold;
      }

      .footer {
        width: 100%;
        height: 50px;
        background-color: #f2eefb;
      }

      @media screen and (max-width:480px) {

        .preheader .rightColumnContent,
        .footer .rightColumnContent {
          text-align: left !important;
        }

        .preheader .rightColumnContent div,
        .preheader .rightColumnContent span,
        .footer .rightColumnContent div,
        .footer .rightColumnContent span {
          text-align: left !important;
        }

        .preheader .rightColumnContent,
        .preheader .leftColumnContent {
          font-size: 80% !important;
          padding: 5px 0;
        }

        table.wrapper-mobile {
          width: 100% !important;
          table-layout: fixed;
        }

        img.max-width {
          height: auto !important;
          max-width: 100% !important;
        }

        a.bulletproof-button {
          display: block !important;
          width: auto !important;
          font-size: 80%;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
      }

      @media screen and (max-width:480px) {
        table {
          width: 480px !important;
        }
      }
    </style>
    <!--user entered Head Start-->
    <link href="https://fonts.googleapis.com/css?family=Lato:300&display=swap" rel="stylesheet">
    <style>
      body {
        font-family: 'Lato', sans-serif;
      }
    </style>
    <!--End Head user entered-->
  </head>

  <body>
    <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:inherit; color:#000000; background-color:#f3f3f3;">
      <div class="webkit">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#f3f3f3">
          <tr>
            <td valign="top" bgcolor="#f3f3f3" width="100%">
              <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="100%">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td>

                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                            <tr>
                              <td role="modules-container" style="0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left">
                                <table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
                                  <tr>
                                    <td role="module-content">
                                      <p></p>
                                    </td>
                                  </tr>
                                </table>
                                <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:30px 0px 30px 0px;" bgcolor="#f2eefb" data-distribution="1">
                                  <tbody>
                                    <tr role="module-content">
                                      <td height="100%" valign="top">
                                        <table width="600" style="width:600px; border-spacing:0; border-collapse:collapse; margin:0px 0px 0px 0px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-0">
                                          <tbody>
                                            <tr>
                                              <td style="padding:0px;margin:0px;border-spacing:0;">
                                                <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="79178f70-3054-4e9f-9b29-edfe3988719e">
                                                  <tbody>
                                                    <tr>
                                                      <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
                                                        <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px;" width="100" alt="" data-proportionally-constrained="true" data-responsive="false" src="http://cdn.mcauto-images-production.sendgrid.net/de46cb2b5c737d52/abb583a4-6776-4bca-bdd3-e0afee2c194f/136x61.png" height="61">
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="ef0f9e06-1b02-4b22-b5e8-dc8f6bb9b3b1" data-mc-module-version="2019-10-22">
                                  <tbody>
                                    <tr>
                                      <td style="padding:50px 20px 10px 20px; line-height:18px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content">
                                        <div>
                                          <div style="font-family: inherit; text-align: center"><span style="font-size: 28px; font-family: inherit">Approved Petty Cash Request</span></div>
                                          <div></div>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="ef0f9e06-1b02-4b22-b5e8-dc8f6bb9b3b1.1.1" data-mc-module-version="2019-10-22">
                                  <tbody>
                                    <tr>
                                      <td style="padding:20px 20px 10px 20px; line-height:12px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content">
                                        <div>
                                          <div style="font-family: inherit; text-align: center">Hello ${
                                            user['Line Manager Name ']
                                          }</div>
                                          <div style="font-family: inherit; text-align: center"><br></div>
                                          <div style="font-family: inherit; text-align: center">Request from ${
                                            user['Full Name']
                                          } - ${user['Job Title']}</div>
                                          <div></div>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>

                                <table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="10dfe38b-ab1a-4083-80ca-725cb09e3c1c">
                                  <tbody>
                                    <tr>
                                      <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table class="module">
                                  <tbody>
                                    <tr>
                                      <td style="padding:18px 30px 18px 40px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content">
                                        <div>
                                          <div style="font-family: inherit; text-align: inherit"><span style="font-size: 28px">Payment Details</span></div>
                                          <div></div>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="86c0feb7-e890-4382-bb8e-b1910742ba10.1.1">
                                  <tbody>
                                    <tr>
                                      <td style="padding:0px 30px 0px 40px;" role="module-content" height="100%" valign="top" bgcolor="">
                                        <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="1px" style="line-height:1px; font-size:1px;">
                                          <tbody>
                                            <tr>
                                              <td style="padding:0px 0px 1px 0px;" bgcolor="#000000"></td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table class="module payment" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="ef0f9e06-1b02-4b22-b5e8-dc8f6bb9b3b1.1.1.1.1" data-mc-module-version="2019-10-22">
                                  <tbody>
                                    <tr>
                                      <td style="padding:30px 20px 0px 40px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content">
                                        <div>
                                          <div style="font-family: inherit; text-align: inherit">Bank Name: ${
                                            req.bankname || 'N/A'
                                          } | Bank Account Name: ${
      req.accountname || 'N/A'
    } </div>

                                          <div style="font-family: inherit; text-align: inherit">Mobile Money #: ${
                                            req.momonumber || 'N/A'
                                          } | BBAN #: ${
      req.bbandnumber || 'N/A'
    }</div>
                                          <div style="font-family: inherit; text-align: inherit">Department: ${
                                            req.department
                                          } | Request Currency: ${
      req.currency
    } | Budget Code: ${req.budgetcode}</div>
                                          <h3>Invoices <a href=${
                                            req.invoiceLink
                                          }>HERE</a></h3>
                                    </tr>
                                  </tbody>
                                </table>
                                <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="f612db9d-7563-4153-b3d5-8a0015929def.1.1" data-mc-module-version="2019-10-22">
                                  <tbody>
                                    <tr>
                                      <td style="padding:18px 30px 18px 40px; line-height:22px; text-align:inherit;" valign="top" bgcolor="" role="module-content">
                                        <div>
                                          <div style="font-family: inherit; text-align: inherit"><span style="font-size: 28px">Items Details</span></div>
                                          <div></div>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="86c0feb7-e890-4382-bb8e-b1910742ba10.1">
                                  <tbody>
                                    <tr>
                                      <td style="padding:0px 30px 0px 40px;" role="module-content" height="100%" valign="top" bgcolor="">
                                        <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="1px" style="line-height:1px; font-size:1px;">
                                          <tbody>
                                            <tr>
                                              <td style="padding:0px 0px 1px 0px;" bgcolor="#000000"></td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table class="module" id="pettycash" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; padding: 0 20px;" data-muid="ef0f9e06-1b02-4b22-b5e8-dc8f6bb9b3b1.1.1.1.1.1" data-mc-module-version="2019-10-22">
                                  <thead>
                                    <tr>
                                      <th>Name</th>
                                      <th>Description</th>
                                      <th>Unit Cost</th>
                                      <th>Quantity</th>
                                      <th>Total</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    ${viewData}
                                    <tr style="background-color:royalblue; font-weight:bold">
                                      <td> Total</td>
                                      <td>-</td>
                                      <td>-</td>
                                      <td>-</td>
                                      <td>${req.currency}${totalArr.reduce(
      (x, y) => x + y,
      0
    )}</td>
                                    </tr>

                                  </tbody>

                                </table>
                                <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="f612db9d-7563-4153-b3d5-8a0015929def.1.1.1" data-mc-module-version="2019-10-22">
                                  <tbody>
                                    <tr>
                                      <td style="padding:18px 30px 18px 40px; line-height:28px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content">
                                        <div>
                                          <div style="font-family: inherit; text-align: center"><span style="font-size: 28px">This Request Has Been Approved</span></div>
                                          <div></div>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>

      </div>
    </center>

  </body>

  </html>

        `,
  };
};
