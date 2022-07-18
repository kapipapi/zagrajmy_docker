# syntax=docker/dockerfile:1

FROM golang:1.18-stretch

RUN apt update && apt upgrade -y && \
    apt install -y git \
    make openssh-client

WORKDIR /app

RUN curl -fLo install.sh https://raw.githubusercontent.com/cosmtrek/air/master/install.sh \
    && chmod +x install.sh && sh install.sh && cp ./bin/air /bin/air

RUN curl -fLo wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh  \
    && chmod +x wait-for-it.sh && cp wait-for-it.sh /bin/wait-for-it.sh

CMD wait-for-it.sh postgres_db:5432 -t 60 -- air --build.cmd "go build -o tmp/api cmd/server.go" --build.bin "./tmp/api"