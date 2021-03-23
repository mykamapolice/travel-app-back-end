const getTimeStamp = (): string => {
  return new Date().toISOString();
};

enum messageTypes {
  info = 'INFO',
  warn = 'WARN',
  error = 'ERROR',
  debug = 'DEBUG',
}

type messageData = {
  type: string;
  namespace: string;
  msg: string;
};

const generateMessageText = (message: messageData): string => {
  const { type, namespace, msg } = message;
  const time: string = new Date().toISOString();

  return `[${time}] [${type}] [${namespace}] ${msg}`;
};

const info = (namespace: string, msg: string, object?: any): void => {
  const message: messageData = {
    type: messageTypes.info,
    namespace,
    msg,
  };

  console.info(generateMessageText(message), object || '');
};

const warn = (namespace: string, msg: string, object?: any): void => {
  const message: messageData = {
    type: messageTypes.warn,
    namespace,
    msg,
  };

  console.warn(generateMessageText(message), object || '');
};

const error = (namespace: string, msg: string, object?: any): void => {
  const message: messageData = {
    type: messageTypes.error,
    namespace,
    msg,
  };

  console.error(generateMessageText(message), object || '');
};

const debug = (namespace: string, msg: string, object?: any): void => {
  const message: messageData = {
    type: messageTypes.debug,
    namespace,
    msg,
  };

  console.debug(generateMessageText(message), object || '');
};

export default { info, warn, error, debug };
