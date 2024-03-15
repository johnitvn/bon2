FROM gcr.io/distroless/nodejs20-debian12

COPY ./dist/{fullpath} /usr/app/dist/{fullpath}

WORKDIR /usr/app

CMD ["dist/{fullpath}/server/main.js"]
