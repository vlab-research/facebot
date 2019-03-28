require('chai').should();
const mocks = require('./mocks');
const sender = require('../services/sender.js');
const app = require('../services/receiver.js');

describe('Test Bot flow Survey1', () => {
  
  const server = app.listen(process.env.PORT || 88);
  let state = 1;
  before(() => {
    console.log('Test starting!');
  });

  afterEach(() => {
    state++;
  });

  after(() => {
    server.close();
    console.log('Server closed!');
  });
  
  it('Start the conversation and should receive Accept Message',  (done) => {
    sender(mocks.referral);
    app.on(`message${state}`, ({message}) => {
      message.should.eql(mocks.acceptMessage)
      sender(mocks.acceptEcho);
      done()
    })
  }).timeout(5000);

  it('Reply "I Accept", should receive first question',  (done) => {
    sender(mocks.acceptPostback);
    app.on(`message${state}`, ({message}) => {
      message.should.eql(mocks.questionMessage)
      sender(mocks.questionEcho);
      done()
    })
  }).timeout(5000);

  it('Reply "yes", should recive "Thanks" and end the conversation',  (done) => {
    sender(mocks.questionPostback);
    app.on(`message${state}`, ({message}) => {
      message.should.eql(mocks.thanksMessage)
      sender(mocks.thanksEcho);
      done()
    })
  }).timeout(5000);
});
