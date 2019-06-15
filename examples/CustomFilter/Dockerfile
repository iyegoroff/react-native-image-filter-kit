FROM iyegoroff/ubuntu-node-android-git:1

RUN mkdir /package
COPY . /package
WORKDIR /package/examples/CustomFilter

RUN npm i -g yarn@1.16.0
RUN yarn
RUN npm run generate:android:bundle
RUN rm -rf node_modules/.bin && rm -rf ../../node_modules/.bin
RUN cd android && ./gradlew assembleRelease
