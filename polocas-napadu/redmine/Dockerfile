FROM redmine:5-alpine

ADD plugins/redmine_agile-1_6_5-light.zip /usr/src/redmine/plugins

RUN cd plugins && \
  wget -O redmine_openid_connect.zip https://github.com/just-paja/redmine_openid_connect/archive/refs/heads/master.zip && \
  wget -O redmine_messenger.zip https://github.com/AlphaNodes/redmine_messenger/archive/main.zip && \
  unzip redmine_messenger.zip && \
  unzip redmine_openid_connect.zip && \
  unzip redmine_agile-1_6_5-light.zip && \
  mv redmine_messenger-main redmine_messenger && \
  mv redmine_openid_connect-master redmine_openid_connect && \
  rm *.zip && \
  cd ../public/themes && \
  wget -O purple-mine.zip https://github.com/mrliptontea/PurpleMine2/archive/master.zip && \
  unzip purple-mine.zip && \
  rm purple-mine.zip

RUN bundle config set --local without 'development test' && \
  bundle install --no-deployment

CMD ["/bin/bash", "-c", "cp /var/redmine/config/configuration.yml /usr/src/redmine/config/configuration.yml && /docker-entrypoint.sh rails server -b 0.0.0.0"]