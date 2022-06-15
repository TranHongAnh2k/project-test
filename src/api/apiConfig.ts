import axios from 'axios';
import config from '../config';
const apiLogRequest = (apiName: any, axiosRequest: any) => {
  console.group &&
    console.group(
      '%cAPI Request',
      'color:white;font-weight:bold;background:#0194ff;padding:2px 6px',
      apiName
    );
  console.log('HTTP Method\t\t', axiosRequest.method.toUpperCase());
  console.log('Endpoint\t\t', axiosRequest.url);
  axiosRequest.data && console.log('Request Body\t', axiosRequest.data);
  console.log('AXIOS Request\t', axiosRequest);
  console.groupEnd && console.groupEnd();
};

const apiLogResponse = (apiName: any, axiosResponse: any) => {
  console.log(axiosResponse);
  console.group &&
    console.group(
      '%cAPI Response',
      'color:white;font-weight:bold;background:green;padding:2px 6px',
      apiName
    );
  console.log('HTTP Method\t\t', axiosResponse.config.method.toUpperCase());
  console.log('Endpoint\t\t', axiosResponse.config.url);
  axiosResponse.config.data && console.log('Request Body\t', axiosResponse.config.data);
  axiosResponse.data && console.log('Response Body\t', axiosResponse.data);
  console.log('AXIOS Response\t', axiosResponse);
  console.groupEnd && console.groupEnd();
};

const apiLogError = (apiName: any, error: any) => {
  console.log('error', error);
  console.group &&
    console.group(
      '%cAPI Response',
      'color:white;font-weight:bold;background:red;padding:2px 6px',
      apiName
    );
  console.log('HTTP Method\t\t', error.config.method.toUpperCase());
  console.log('Endpoint\t\t', error.config.url);
  error && error.config.data && console.log('Request Body\t', error.config.data);
  error && error.data && console.log('Response Body\t', error.data);
  console.log('AXIOS Error\t', error);
  console.groupEnd && console.groupEnd();
};

const client = axios.create({
  baseURL: config.axiosConfig().baseURL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use(
  request => {
    return request;
  }
);

client.interceptors.response.use(
  response => {
    return response;
  },
  error => {

    if (error.response) {
      const apiName = error.config.apiName || 'UNKNOWN';
      apiLogError(apiName, error.response);
    } else if (error.request) {
      const apiName = error.config.headers['X_HEADER_API_LOG'] || 'UNKNOWN';
      apiLogError(apiName, error.request);
    } else {
      console.log('API Error', error.message);
    }
    throw error;
  }
)

// enable request logging for dev
client.interceptors.request.use(
  request => {
    const apiName = 'UNKNOWN';
    apiLogRequest(apiName, request);
    return request;
  },
  error => {
    console.log('API Error', error);
    return error;
  }
);

client.interceptors.response.use(
  response => {
    apiLogResponse("UNKNOWN", response)
    return response;
  }
);

export default client;
