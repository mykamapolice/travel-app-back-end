const getTimeStamp = (): string => {
  return new Date().toISOString();
};

const info = (namespace: string, msg: string, object?: any) => {
  if (object) {
    console.info(`[${getTimeStamp()}] [INFO] [${namespace}] ${msg}`, object);
  } else {
    console.info(`[${getTimeStamp()}] [INFO] [${namespace}] ${msg}`);
  }
};

const warn = (namespace: string, msg: string, object?: any) => {
  if (object) {
    console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${msg}`, object);
  } else {
    console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${msg}`);
  }
};

const error = (namespace: string, msg: string, object?: any) => {
  if (object) {
    console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${msg}`, object);
  } else {
    console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${msg}`);
  }
};

const debug = (namespace: string, msg: string, object?: any) => {
  if (object) {
    console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${msg}`, object);
  } else {
    console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${msg}`);
  }
};

export default { info, warn, error, debug };
