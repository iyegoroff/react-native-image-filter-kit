import { defaultCancellationToken } from "./Async";
import { fromContinuations } from "./Async";
import { startImmediate } from "./Async";
class QueueCell {
  constructor(message) {
    this.value = message;
  }
}
class MailboxQueue {
  add(message) {
    const itCell = new QueueCell(message);
    if (this.firstAndLast) {
      this.firstAndLast[1].next = itCell;
      this.firstAndLast = [this.firstAndLast[0], itCell];
    } else {
      this.firstAndLast = [itCell, itCell];
    }
  }
  tryGet() {
    if (this.firstAndLast) {
      const value = this.firstAndLast[0].value;
      if (this.firstAndLast[0].next) {
        this.firstAndLast = [this.firstAndLast[0].next, this.firstAndLast[1]];
      } else {
        delete this.firstAndLast;
      }
      return value;
    }
    return void 0;
  }
}
export default class MailboxProcessor {
  constructor(body, cancellationToken) {
    this.body = body;
    this.cancellationToken = cancellationToken || defaultCancellationToken;
    this.messages = new MailboxQueue();
  }
  __processEvents() {
    if (this.continuation) {
      const value = this.messages.tryGet();
      if (value) {
        const cont = this.continuation;
        delete this.continuation;
        cont(value);
      }
    }
  }
  start() {
    startImmediate(this.body(this), this.cancellationToken);
  }
  receive() {
    return fromContinuations(conts => {
      if (this.continuation) {
        throw new Error("Receive can only be called once!");
      }
      this.continuation = conts[0];
      this.__processEvents();
    });
  }
  post(message) {
    this.messages.add(message);
    this.__processEvents();
  }
  postAndAsyncReply(buildMessage) {
    let result;
    let continuation;
    function checkCompletion() {
      if (result && continuation) {
        continuation(result);
      }
    }
    const reply = {
      reply: res => {
        result = res;
        checkCompletion();
      }
    };
    this.messages.add(buildMessage(reply));
    this.__processEvents();
    return fromContinuations(conts => {
      continuation = conts[0];
      checkCompletion();
    });
  }
}
export function start(body, cancellationToken) {
  const mbox = new MailboxProcessor(body, cancellationToken);
  mbox.start();
  return mbox;
}