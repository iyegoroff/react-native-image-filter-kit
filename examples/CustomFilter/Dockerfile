FROM beevelop/android-nodejs:latest

RUN mkdir /package
COPY . /package
WORKDIR /package/examples/CustomFilter

RUN npm i -g npm@6.5.0
RUN npm i --unsafe-perm
RUN npm run generate:android:bundle
RUN rm -rf node_modules/.bin && rm -rf ../../node_modules/.bin
RUN cd android && ./gradlew assembleRelease
