FROM alpine:3.17

RUN apk add --update nodejs npm

WORKDIR /usr/src/app

ADD polocas-napadu-redirects.tgz .

WORKDIR /usr/src/app/package

RUN npm install --omit=dev --omit=optional

CMD [ "npm", "run", "start" ]
