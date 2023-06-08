FROM ubuntu:20.04
LABEL author="lqzh"

# 修改时区
ENV TIME_ZONE Asia/Shanghai
RUN apt-get update \
    && apt-get install -y tzdata \
    && ln -snf /usr/share/zoneinfo/$TIME_ZONE /etc/localtime && echo $TIME_ZONE > /etc/timezone \
    && dpkg-reconfigure -f noninteractive tzdata


RUN apt-get install -y sqlcipher


# 将脚本放置在 home
RUN mkdir -p /home
WORKDIR /home
ADD decode.sh /home/
RUN chmod 777 decode.sh


# app 会被挂载
RUN mkdir -p /app
WORKDIR /app


ENV DB_KEY=yourkey

CMD /home/decode.sh $DB_KEY
