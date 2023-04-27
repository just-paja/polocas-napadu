FROM redmine:5-alpine

ADD plugins/redmine_agile-1_6_5-light.zip /usr/src/redmine/plugins
ADD https://github.com/mrliptontea/PurpleMine2/archive/master.zip /usr/src/redmine/public/themes/purple-mine.zip

RUN cd plugins && \
  unzip redmine_agile-1_6_5-light.zip && \
  rm redmine_agile-1_6_5-light.zip && \
  cd ../public/themes && \
  unzip purple-mine.zip && \
  rm purple-mine.zip

RUN bundle install --without development test --no-deployment
