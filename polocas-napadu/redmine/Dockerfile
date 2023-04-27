FROM redmine:5-alpine

RUN cd public/themes && \
  wget -O purple-mine.zip https://github.com/mrliptontea/PurpleMine2/archive/master.zip && \
  cd public/themes && \
  unzip purple-mine.zip && \
  rm purple-mine.zip
